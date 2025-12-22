output "vnet_name" {
  value = azurerm_virtual_network.vnet.name
}

output "subnet_ids" {
  value = { for k, v in azurerm_subnet.subnet : k => v.id }
}