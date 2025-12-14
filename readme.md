# Copilot Instructions

This is a Terraform project for provisioning Ubuntu VMs on Proxmox infrastructure.

## Project Overview

- **Language**: HCL (HashiCorp Configuration Language)
- **Purpose**: Infrastructure as Code for Proxmox VM deployment
- **Key Components**: Provider configuration, variables, VM resources, and networking

## Key Files & Structure

- `main.tf` - Primary VM and resource definitions
- `provider.tf` - Proxmox provider authentication and configuration
- `variables.tf` - Input variables for VM customization
- `outputs.tf` - Output values for VM details
- `terraform.tfvars` - Variable values (excluded from version control)

## Essential Workflows

### Initialize Terraform
```bash
terraform init
```

### Validate Configuration
```bash
terraform validate
```

### Plan Deployment
```bash
terraform plan -out=tfplan
```

### Apply Configuration
```bash
terraform apply tfplan
```

### Destroy Resources
```bash
terraform destroy
```

## Project Conventions

1. **Variables**: All configurable values (VM name, CPU, memory, disk size) are defined in `variables.tf`
2. **Proxmox Details**: Provider credentials and endpoint are in `provider.tf` using environment variables or `terraform.tfvars`
3. **Naming**: VM names follow pattern: `ubuntu-vm-{environment}-{index}`
4. **Cloud-Init**: Ubuntu VMs are provisioned with cloud-init for post-deployment configuration

## Integration Points

- **Proxmox API**: Communication via Proxmox provider (credentials required)
- **Cloud-Init**: User data script passed to VMs for initial setup
- **Local Storage**: VM templates stored in Proxmox local-lvm storage

## Common Tasks

- **Modify VM specs**: Update variables in `variables.tf` or `terraform.tfvars`
- **Add more VMs**: Add new resource blocks to `main.tf` with unique names
- **Change storage**: Update `storage_location` variable
- **Enable SSH**: Ensure cloud-init user data includes SSH key setup
