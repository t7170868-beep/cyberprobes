#!/bin/bash

# CyberProbes AWS Deployment Script
echo "🚀 Starting CyberProbes deployment to AWS..."

# Set variables
AWS_REGION="us-east-1"
ECR_REPOSITORY="cyberprobes-app"
IMAGE_TAG="latest"
CLUSTER_NAME="cyberprobes-cluster"
SERVICE_NAME="cyberprobes-service"

# Build Docker image
echo "📦 Building Docker image..."
docker build -t $ECR_REPOSITORY:$IMAGE_TAG .

# Get AWS account ID
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

# Create ECR repository if it doesn't exist
echo "🏗️ Creating ECR repository..."
aws ecr create-repository --repository-name $ECR_REPOSITORY --region $AWS_REGION || true

# Get ECR login token
echo "🔐 Logging into ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Tag and push image to ECR
echo "📤 Pushing image to ECR..."
docker tag $ECR_REPOSITORY:$IMAGE_TAG $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:$IMAGE_TAG
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:$IMAGE_TAG

# Create ECS cluster if it doesn't exist
echo "🏗️ Creating ECS cluster..."
aws ecs create-cluster --cluster-name $CLUSTER_NAME --region $AWS_REGION || true

# Register task definition
echo "📋 Registering task definition..."
aws ecs register-task-definition \
  --family cyberprobes-task \
  --network-mode awsvpc \
  --requires-attributes name=com.amazonaws.ecs.capability.docker-remote-api.1.18 \
  --cpu 512 \
  --memory 1024 \
  --execution-role-arn arn:aws:iam::$AWS_ACCOUNT_ID:role/ecsTaskExecutionRole \
  --container-definitions '[
    {
      "name": "cyberprobes-container",
      "image": "'$AWS_ACCOUNT_ID'.dkr.ecr.'$AWS_REGION'.amazonaws.com/'$ECR_REPOSITORY':'$IMAGE_TAG'",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "essential": true,
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/cyberprobes-task",
          "awslogs-region": "'$AWS_REGION'",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]' \
  --region $AWS_REGION

# Create or update ECS service
echo "🚀 Creating/updating ECS service..."
aws ecs create-service \
  --cluster $CLUSTER_NAME \
  --service-name $SERVICE_NAME \
  --task-definition cyberprobes-task \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-12345678],securityGroups=[sg-12345678],assignPublicIp=ENABLED}" \
  --region $AWS_REGION || \
aws ecs update-service \
  --cluster $CLUSTER_NAME \
  --service $SERVICE_NAME \
  --task-definition cyberprobes-task \
  --region $AWS_REGION

echo "✅ Deployment completed successfully!"
echo "🌐 Your application will be available at the ECS service endpoint."
