variable "env" {
  description = "Environment name"
  type        = string
}

variable "location" {
  description = "Azure region"
  type        = string
}

variable "vnet_cidr" {
  description = "VNET CIDR"
  type        = string
}

variable "subnets" {
  description = "Subnets map"
  type = map(object({
    cidr = string
  }))
}