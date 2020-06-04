provider "aws" {
  region  = "eu-west-2"
  version = "~> 2.0"
}
data "aws_iam_role" "ec2_container_service_role" {
  name = "ecsServiceRole"
}
data "aws_iam_role" "ecs_task_execution_role" {
  name = "ecsTaskExecutionRole"
}
data "aws_caller_identity" "current" {}
data "aws_region" "current" {}
locals {
  parameter_store = "arn:aws:ssm:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:parameter"
}
terraform {
  backend "s3" {
    bucket  = "hackney-mat-state-storage-s3"
    encrypt = true
    region  = "eu-west-2"
    key     = "services/rebuild/hc/state"
  }
}
module "production" {
  source                      = "github.com/LBHackney-IT/aws-hackney-components-per-service-terraform.git//modules/environment/frontend/fargate"
  ecs_cluster                 = "mat" # Replace with your cluster name.
  environment_name            = "production"
  application_name            = "hc-process"    # Replace with your application name.
  security_group_name         = "mat" # Replace with your security group name, WITHOUT SPECIFYING environment .
  vpc_name                    = "vpc-mat"
  port                        = 3000
  desired_number_of_ec2_nodes = 2
  lb_prefix                   = "alb-mat"
  ecs_execution_role          = data.aws_iam_role.ecs_task_execution_role.arn
  lb_iam_role_arn             = data.aws_iam_role.ec2_container_service_role.arn
  path_pattern                = "/hc*"
  task_definition_environment_variables = {
    BASE_PATH = "/hc"
    DIVERSITY_FORM_URL = "url.to.form"
    ENVIRONMENT_NAME = "production"
    MAT_API_BASE_URL = "/production/manage-a-tenancy-api"
    MAT_API_HOST     = "g6bw0g0ojk.execute-api.eu-west-2.amazonaws.com"
    NODE_ENV = "production"
    PROCESS_API_BASE_URL = "/production/process-api/api"
    PROCESS_API_HOST     = "4edqo0pz1l.execute-api.eu-west-2.amazonaws.com"
    PROCESS_NAME       = "hc"
    PROCESS_TYPE_NAME  = "Household check"
    PROCESS_TYPE_VALUE = "100000052"
    WORKTRAY_URL = "https://services.hackney.gov.uk/manageatenancy/OfficerDashboard.aspx"
  }
  cost_code = "B0811"
  task_definition_environment_variable_count = 12
  task_definition_secrets      = { 
    PROCESS_API_JWT_SECRET  = "${local.parameter_store}/production-thc-ROCESS_API_JWT_SECRET"
    PROCESS_API_KEY         = "${local.parameter_store}/production-thc-PROCESS_API_KEY"
    MAT_API_JWT_SECRET      = "${local.parameter_store}/production-thc-MAT_API_JWT_SECRET"
    MAT_API_DATA_SHARED_KEY = "${local.parameter_store}/production-thc-MAT_API_DATA_SHARED_KEY"
    MAT_API_DATA_SALT       = "${local.parameter_store}/production-thc-MAT_API_DATA_SALT"
    MAT_API_DATA_ITERATIONS = "${local.parameter_store}/production-thc-MAT_API_DATA_ITERATIONS"
    MAT_API_DATA_KEY_SIZE   = "${local.parameter_store}/production-thc-MAT_API_DATA_KEY_SIZE"
    MAT_API_DATA_ALGORITHM  = "${local.parameter_store}/production-thc-MAT_API_DATA_ALGORITHM"
    MAT_API_DATA_IV         = "${local.parameter_store}/production-thc-MAT_API_DATA_IV"
  }
  task_definition_secret_count = 9

   protocol         = "HTTP"
   listener_http_port = 80
}

module "staging" {
  source                      = "github.com/LBHackney-IT/aws-hackney-components-per-service-terraform.git//modules/environment/frontend/fargate"
  ecs_cluster                 = "mat" # Replace with your cluster name.
  environment_name            = "staging"
  application_name            = "hc-process"    # Replace with your application name.
  security_group_name         = "mat" # Replace with your security group name, WITHOUT SPECIFYING environment .
  vpc_name                    = "vpc-mat"
  port                        = 3001
  desired_number_of_ec2_nodes = 2
  lb_prefix                   = "alb-mat"
  ecs_execution_role          = data.aws_iam_role.ecs_task_execution_role.arn
  lb_iam_role_arn             = data.aws_iam_role.ec2_container_service_role.arn
  path_pattern                = "/hc*"
  task_definition_environment_variables = {
    BASE_PATH = "/hc"
    DIVERSITY_FORM_URL = "url.to.form"
    ENVIRONMENT_NAME = "staging"
    MAT_API_BASE_URL = "/staging/manage-a-tenancy-api"
    MAT_API_HOST     = "g6bw0g0ojk.execute-api.eu-west-2.amazonaws.com"
    NODE_ENV = "production"
    PROCESS_API_BASE_URL = "/staging/process-api/api"
    PROCESS_API_HOST     = "hvlo6az3t2.execute-api.eu-west-2.amazonaws.com"
    PROCESS_NAME       = "hc"
    PROCESS_TYPE_NAME  = "Household check"
    PROCESS_TYPE_VALUE = "100000052"
    WORKTRAY_URL = "https://hlbctrial-tst.outsystemsenterprise.com/manageatenancy/OfficerDashboard.aspx"
  }
  cost_code = "B0811"
  task_definition_environment_variable_count = 12

  task_definition_secrets      = { 
    PROCESS_API_JWT_SECRET  = "${local.parameter_store}/development-thc-ROCESS_API_JWT_SECRET"
    PROCESS_API_KEY         = "${local.parameter_store}/development-thc-PROCESS_API_KEY"
    MAT_API_JWT_SECRET      = "${local.parameter_store}/development-thc-MAT_API_JWT_SECRET"
    MAT_API_DATA_SHARED_KEY = "${local.parameter_store}/development-thc-MAT_API_DATA_SHARED_KEY"
    MAT_API_DATA_SALT       = "${local.parameter_store}/development-thc-MAT_API_DATA_SALT"
    MAT_API_DATA_ITERATIONS = "${local.parameter_store}/development-thc-MAT_API_DATA_ITERATIONS"
    MAT_API_DATA_KEY_SIZE   = "${local.parameter_store}/development-thc-MAT_API_DATA_KEY_SIZE"
    MAT_API_DATA_ALGORITHM  = "${local.parameter_store}/development-thc-MAT_API_DATA_ALGORITHM"
    MAT_API_DATA_IV         = "${local.parameter_store}/development-thc-MAT_API_DATA_IV"
  }
  task_definition_secret_count = 9

  protocol         = "HTTP"
  listener_http_port = 80
}

module "development" {
  source                      = "github.com/LBHackney-IT/aws-hackney-components-per-service-terraform.git//modules/environment/frontend/fargate"
  ecs_cluster                 = "mat" # Replace with your cluster name.
  environment_name            = "development"
  application_name            = "hc-process"    # Replace with your application name.
  security_group_name         = "mat" # Replace with your security group name, WITHOUT SPECIFYING environment .
  vpc_name                    = "vpc-mat"
  port                        = 3002
  desired_number_of_ec2_nodes = 2
  lb_prefix                   = "alb-mat"
  ecs_execution_role          = data.aws_iam_role.ecs_task_execution_role.arn
  lb_iam_role_arn             = data.aws_iam_role.ec2_container_service_role.arn
  path_pattern                = "/hc*"
  task_definition_environment_variables = {
    BASE_PATH = "/hc"
    DIVERSITY_FORM_URL = "url.to.form"
    ENVIRONMENT_NAME = "development"
    MAT_API_BASE_URL = "/development/manage-a-tenancy-api"
    MAT_API_HOST = "g6bw0g0ojk.execute-api.eu-west-2.amazonaws.com"
    NODE_ENV = "production"
    PROCESS_API_BASE_URL = "/development/mat-process/api"
    PROCESS_API_HOST = "4cgb2c6pqe.execute-api.eu-west-2.amazonaws.com"
    PROCESS_NAME = "hc"
    PROCESS_TYPE_NAME = "Household check"
    PROCESS_TYPE_VALUE = "100000052"
    WORKTRAY_URL = "https://hlbctrial-dev.outsystemsenterprise.com/manageatenancy/OfficerDashboard.aspx"
  }

  cost_code = "B0811"
  task_definition_environment_variable_count = 12

  task_definition_secrets      = { 
    PROCESS_API_JWT_SECRET  = "${local.parameter_store}/development-thc-ROCESS_API_JWT_SECRET"
    PROCESS_API_KEY         = "${local.parameter_store}/development-thc-PROCESS_API_KEY"
    MAT_API_JWT_SECRET      = "${local.parameter_store}/development-thc-MAT_API_JWT_SECRET"
    MAT_API_DATA_SHARED_KEY = "${local.parameter_store}/development-thc-MAT_API_DATA_SHARED_KEY"
    MAT_API_DATA_SALT       = "${local.parameter_store}/development-thc-MAT_API_DATA_SALT"
    MAT_API_DATA_ITERATIONS = "${local.parameter_store}/development-thc-MAT_API_DATA_ITERATIONS"
    MAT_API_DATA_KEY_SIZE   = "${local.parameter_store}/development-thc-MAT_API_DATA_KEY_SIZE"
    MAT_API_DATA_ALGORITHM  = "${local.parameter_store}/development-thc-MAT_API_DATA_ALGORITHM"
    MAT_API_DATA_IV         = "${local.parameter_store}/development-thc-MAT_API_DATA_IV"
  }
  
  task_definition_secret_count = 9

   protocol         = "HTTP"
   listener_http_port = 80
}
/*   ADD ANY OTHER CUSTOM RESOURCES REQUIRED HERE      */

#
