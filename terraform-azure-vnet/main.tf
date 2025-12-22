resource "azurerm_resource_group" "rg" {
  name     = "rg-${var.env}-network"
  location = var.location
}

resource "azurerm_virtual_network" "vnet" {
  name                = "vnet-${var.env}"
  location            = var.location
  resource_group_name = azurerm_resource_group.rg.name
  address_space       = [var.vnet_cidr]
}

resource "azurerm_subnet" "subnet" {
  for_each = var.subnets

  name                 = each.key
  resource_group_name  = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.vnet.name
  address_prefixes     = [each.value.cidr]
}