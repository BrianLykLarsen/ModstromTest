param($installPath, $toolsPath, $package, $project)


if ($project) {

	$projectDestinationPath = Split-Path $project.FullName -Parent
    
	$fileMaster = Join-Path $projectDestinationPath "less/master.less"
	$fileBootstrap = Join-Path $projectDestinationPath "less/libs/novicell.master.bootstrap.less"
	
	$contentMaster = Get-Content $fileMaster
	$contentBootstrap = Get-Content $fileBootstrap
	
	$backupPostfix = Get-Date -format "yyyyMMdd-HHmmss"
	$backupPostfix = ".$backupPostfix"
	$fileNameBackup = "master.less.bak$backupPostfix"
	$fileBackup =  Join-Path $projectDestinationPath $fileNameBackup
	$fileBootstrapBackup = Join-Path $projectDestinationPath "less/master.bootstrap.less.updated$backupPostfix"

    $teststring = Select-String -Simple "Novicell master.bootstrap" $fileMaster
	
	# check if master bootstrap is included. do backup and/or combine files
	if (!($teststring)) {

        Copy-Item $fileMaster $fileBackup
	    gc $fileBootstrap,$fileBackup | out-file $fileMaster 
	}
	else{
	    copy-Item $fileBootstrap $fileBootstrapBackup
	}
    
}
