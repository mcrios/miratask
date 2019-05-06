  <?php 
	$ci =&get_instance();
	$ci->load->model("MatterModel");

 ?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Fine Uploader Gallery CSS file
    ====================================================================== -->
    <link href="<?=base_url()?>js/fine-uploader/fine-uploader-gallery.css" rel="stylesheet">

    <!-- Fine Uploader JS file
    ====================================================================== -->
    <script src="<?=base_url()?>js/fine-uploader/fine-uploader.js"></script>

    <!-- Fine Uploader Gallery template
    ====================================================================== -->
    <script type="text/template" id="qq-template-gallery">
        <div class="qq-uploader-selector qq-uploader qq-gallery" qq-drop-area-text="Drop files here">
            <div class="qq-total-progress-bar-container-selector qq-total-progress-bar-container">
                <div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" class="qq-total-progress-bar-selector qq-progress-bar qq-total-progress-bar"></div>
            </div>
            <div class="qq-upload-drop-area-selector qq-upload-drop-area" qq-hide-dropzone>
                <span class="qq-upload-drop-area-text-selector"></span>
            </div>
            <div class="qq-upload-button-selector qq-upload-button">
                <div>Upload a file</div>
            </div>
            <span class="qq-drop-processing-selector qq-drop-processing">
                <span>Processing dropped files...</span>
                <span class="qq-drop-processing-spinner-selector qq-drop-processing-spinner"></span>
            </span>
            <ul class="qq-upload-list-selector qq-upload-list" role="region" aria-live="polite" aria-relevant="additions removals">
                <li>
                    <span role="status" class="qq-upload-status-text-selector qq-upload-status-text"></span>
                    <div class="qq-progress-bar-container-selector qq-progress-bar-container">
                        <div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" class="qq-progress-bar-selector qq-progress-bar"></div>
                    </div>
                    <span class="qq-upload-spinner-selector qq-upload-spinner"></span>
                    <div class="qq-thumbnail-wrapper">
                        <img class="qq-thumbnail-selector" qq-max-size="120" qq-server-scale>
                    </div>
                    <button type="button" class="qq-upload-cancel-selector qq-upload-cancel">X</button>
                    <button type="button" class="qq-upload-retry-selector qq-upload-retry">
                        <span class="qq-btn qq-retry-icon" aria-label="Retry"></span>
                        Retry
                    </button>

                    <div class="qq-file-info">
                        <div class="qq-file-name">
                            <span class="qq-upload-file-selector qq-upload-file"></span>
                            <span class="qq-edit-filename-icon-selector qq-edit-filename-icon" aria-label="Edit filename"></span>
                        </div>
                        <input class="qq-edit-filename-selector qq-edit-filename" tabindex="0" type="text">
                        <span class="qq-upload-size-selector qq-upload-size"></span>
                        <button type="button" class="qq-btn qq-upload-delete-selector qq-upload-delete">
                            <span class="qq-btn qq-delete-icon" aria-label="Delete"></span>
                        </button>
                        <button type="button" class="qq-btn qq-upload-pause-selector qq-upload-pause">
                            <span class="qq-btn qq-pause-icon" aria-label="Pause"></span>
                        </button>
                        <button type="button" class="qq-btn qq-upload-continue-selector qq-upload-continue">
                            <span class="qq-btn qq-continue-icon" aria-label="Continue"></span>
                        </button>
                    </div>
                </li>
            </ul>

            <dialog class="qq-alert-dialog-selector">
                <div class="qq-dialog-message-selector"></div>
                <div class="qq-dialog-buttons">
                    <button type="button" class="qq-cancel-button-selector">Close</button>
                </div>
            </dialog>

            <dialog class="qq-confirm-dialog-selector">
                <div class="qq-dialog-message-selector"></div>
                <div class="qq-dialog-buttons">
                    <button type="button" class="qq-cancel-button-selector">No</button>
                    <button type="button" class="qq-ok-button-selector">Yes</button>
                </div>
            </dialog>

            <dialog class="qq-prompt-dialog-selector">
                <div class="qq-dialog-message-selector"></div>
                <input type="text">
                <div class="qq-dialog-buttons">
                    <button type="button" class="qq-cancel-button-selector">Cancel</button>
                    <button type="button" class="qq-ok-button-selector">Ok</button>
                </div>
            </dialog>
        </div>
    </script>
	
	<script>

          var folder=1;

	</script>

    <title> </title>
</head>
<body>




 

		<div id=" " class="col-md-12 boxSlider">

			<div class="BoxtitleGray">
				<img src="<?=base_url()?>img/gray_folder.png"> &nbsp; Add Document  <span onclick="CloseObject('newFolder')" >X</span>
			</div>
			
			<div class="boxheadButtons">
					 
			</div>
				
			 <div class="clearh50"></div>

		
			<div class="TaskallInputWrap allInputContainer">

				<form id="formNewDocs">

					<div id="listErrors"></div>

					<div class="form-group row btn-group ml-2  " >
				 
						<label>Select folder </label> 

						 

				      	<div class="btn-group ml-2  foldWrap" >
							<div id="folderSelector"   class="largeselect"  style="margin-left:25px;" >Select Folder</div>
					      	<button type="button" class="btn btn-secondary dropdown-toggle Tcarre" data-toggle="dropdown" aria-expanded="false" style="width:50px;">
								<span class="caret"></span>
					      	</button>

					      	<ul class="dropdown-menu btn-block" role="menu">
					      		<?php 
				 
								foreach($Folders as $row)
								{	

								?>
					        	<li onclick="ChangeFolder('<?=$row->Id?>','<?=$row->Name?>', 'folderSelector' )"  ><?=$row->Name?></li>
					        	<?php
					        	}
					        	?>
					      	</ul>

						</div>
					</div>

					 

					<div class="form-group row btn-group ml-2  ">
			 
						<label>Attach To</label> 

						<input id="EstimatedTime" class="largeselect" value="" onkeyup="ContactAndMAtt(this.value,'_A')" placeholder="Search for contact or matter " type="text"> 

						<a class="Tcarre">

							<span class="caret"></span>   

						</a>

						<div class="  dropdown-menu" id="ContactResult_A"></div>

						<div id="ButtonsWrapBox_A" class="ml125">
							<!-- ContMAtter_A -->

							<!-- ContMAtter_A -->
						<?php if($actualMatter!=""){ 

								$actualMatter=$ci->MatterModel->selectOne($actualMatter);
							?>

						<!-- ContMAtter_A -->
						<span id="ContMAtterButt38" class="staffItem  btn btn-default btn-xs"> 
							<?=$actualMatter->Name?><span onclick=""> </span>
						<input type="hidden" name="ContMAtter_A[]" value="<?=$actualMatter->Id?>_matter"></span>

						<?php  } ?>
						</div>

					</div>

						

					<div class="form-group row btn-group ml-2">
			 
						<label>Description</label> 
						
						<textarea id="Description" name="Description" type="textarea" class="largeselect" placeholder="Type a description"></textarea>
					</div>
				
						    <!-- Fine Uploader DOM Element
						    ====================================================================== -->
						    <div id="fine-uploader-gallery"></div>

						    <!-- Your code to create an instance of Fine Uploader and bind to the DOM/template
						    ====================================================================== -->
						    <script>
						        var galleryUploader = new qq.FineUploader({
						            element: document.getElementById("fine-uploader-gallery"),
						            template: 'qq-template-gallery',
						            //debug:true,
						            request: {
						                endpoint: '<?=base_url()?>AjaxDoc/upload/'+folder
						            },
						            thumbnails: {
						                placeholders: {
						                    waitingPath: '<?=base_url()?>img/getting.png',
						                    notAvailablePath: '<?=base_url()?>img/QuickStart.png'
						                }
						            },
						            validation: {
						                allowedExtensions: ['docx', 'doc', 'pdf','png','jpg','jpeg','PNG','JPG','JPEG','MP4','AVI','WEBM','3GP','GIF','WMV','MKV','MPG','VOB','MOV','FLV','SWF']
						            },
						            deleteFile: {
								        enabled: true,
								        forceConfirm: true,
								        endpoint: '<?=base_url()?>AjaxDoc/delete',
								        method:'POST'
								    },
                                    callbacks: {
                                        onError: function(id, name, errorReason, xhrOrXdr) {
                                            
                                            alert(qq.format("Error on file number {} - {}.  Reason: {}", id, name, errorReason));
                                            


                                        }
                                    }
						        });
						    </script>

					 <div class="clearh50"></div>
					<div class="form-group">
						<div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">

							<a onclick="saveDataOfDoc()" type="button"   id="save_close_atach"  class="btn btn-primary " > 
								Save and Close
							</a>


							<a id="cancel"  onclick="CloseObject('newFolder')" class="btn btn-primary">Cancel </a>
						</div>
					</div>
				
				
				</form>	
				
			</div>	<!-- fin intput container --> 
			
			
		
		</div>
		
		<div class="clearh50"></div>

	</body>
</html>	

	 