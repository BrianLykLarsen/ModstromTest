param($installPath, $toolsPath, $package, $project)

if ($project) {
	$backupPostfix = Get-Date -format "yyyyMMdd"
 	$backupPostfix = ".$backupPostfix"
 	$random = Get-Random
	$backupPostfix  = "$backupPostfix.$random";

	$projectDestinationPath = Split-Path $project.FullName -Parent
		
	# Create a backup of original web.config
	$webConfigSource = Join-Path $projectDestinationPath "web.config"
	$webConfigDestination = Join-Path $projectDestinationPath "web.config.backup$backupPostfix"
	Copy-Item $webConfigSource $webConfigDestination

	# Create a backup of original web.release.config
	$projectDestinationPath = Split-Path $project.FullName -Parent
	$webConfigSource = Join-Path $projectDestinationPath "web.release.config"
	$webConfigDestination = Join-Path $projectDestinationPath "web.release.config.backup$backupPostfix" 
	Copy-Item $webConfigSource $webConfigDestination
    
    # http://stackoverflow.com/questions/6901954/can-nuget-edit-a-config-file-or-only-add-to-it
    $xml = New-Object xml
    # find the Web.config file
    $config = $project.ProjectItems | where {$_.Name -eq "Web.config"}
    # find its path on the file system
    $localPath = $config.Properties | where {$_.Name -eq "LocalPath"}
    
    # load Web.config as XML
    $xml.Load($localPath.Value)
    # select the node
    $node = $xml.SelectSingleNode("configuration/appSettings/add[@key='umbracoUseDirectoryUrls']")
    # change the connectionString value
    $node.SetAttribute("value", "true")
    
    
    $node = $xml.SelectSingleNode("configuration/system.net/mailSettings/smtp/network")
    
    $node.SetAttribute("host", "relay01.nchost.dk")
    
    $node.RemoveAttribute("userName")
    $node.RemoveAttribute("password")
    
    # save the Web.config file
    $xml.Save($localPath.Value)
    
    
    #Update the UmbracoSettings.config to set internalRedirectPreservesTemplate = true, so that the XML sitemap can be accessed.
    
    # Create a backup of original UmbracoSettings.config
	$umbConfigSource = Join-Path $projectDestinationPath "/config/UmbracoSettings.config"
	$umbConfigDestination = Join-Path $projectDestinationPath "/config/UmbracoSettings.config.backup$backupPostfix"
	Copy-Item $umbConfigSource $umbConfigDestination
    
    $xml = New-Object xml
    # find the UmbracoSettings.config file
    $umbConfig = $project.ProjectItems.Item("config").ProjectItems.Item("UmbracoSettings.config")
    # find its path on the file system
    $umbLocalPath = $umbConfig.Properties | where {$_.Name -eq "LocalPath"}
    
    # load UmbracoSettings.config as XML
    $xml.Load($umbLocalPath.Value)
    
    $node = $xml.SelectSingleNode("settings/web.routing")
    $node.SetAttribute("internalRedirectPreservesTemplate", "true")
    $xml.Save($umbLocalPath.Value)  
}