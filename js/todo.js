	var $tabs = $("#tabs").tabs({
		tabTemplate: "<li><a href='#{href}'>#{label}</a>\
								 <span class='ui-icon ui-icon-close'>Remove Tab</span></li>",
		add: function( event, ui ) {
			$("#newProjectTabTemplate").tmpl().appendTo(ui.panel).setupToDoList();
				}
	});
	
	$( "#tabs span.ui-icon-close" ).live( "click", function() {
		
		$tabs.tabs('remove', $(this).closest('li').index());
	});
		
	var addProjectItem = $("#AddProjectItem").dialog({
		modal: 		true,
		autoOpen: false,
		buttons : {
			"Add new project" : function() {
				var foo = new Date();
				$tabs.tabs("add", "#project-" + foo.getTime(), $("#project").val())
				     .tabs("select", $tabs.tabs("length") - 1);
				$(this).dialog("close");
				$("#project").val("");
			},
			
			"Cancel" : function() {
				$(this).dialog("close");
				$("#project").val("");
			}
		}
	});

	$("#AddProject").bind("click", function(){
		addProjectItem.dialog('open');
	}).button();
	
	$.fn.setupToDoList = function () {
    return this
      .find(".accordion").refreshAccordion().sortable({
					axis: "y",
					handle: "h3",
					stop: function() {
						stop = true;
					},
					cancel : ".ui-state-disabled"
				}).end().find("button").button();
  };
  
  $.fn.refreshAccordion = function () {
    return this
        .accordion('destroy').accordion({
    			active: false,
    			autoHeight: false,
    			collapsible : true,
    			header: "> div > h3"
    		}).sortable('refresh');
  };
	
	var stop = false;

	$( ".accordion h3" ).click(function( event ) {
		if ( stop ) {
			event.stopImmediatePropagation();
			event.preventDefault();
			stop = false;
		}
	});
	
	var addToDo = $("#AddToDoItem").dialog({
		modal: true,
		autoOpen: false,
		buttons : {
			"Add to do item": function() {
				var newItem = [{ 
						task: $("#task").val(),
						description: $("#description").val(),
						duedate: $("#duedate").val()
					}],
					
				  $accordion = $tabs.find(".ui-tabs-panel:visible .accordion");
				$("#ToDoItemTemplate")
				  .tmpl(newItem)
				  .appendTo($accordion);
				
				$accordion.refreshAccordion();
				$(this).dialog("close");
				$("#task, #description, #duedate").val("");
			},
			
			"Cancel": function(){
				$(this).dialog("close");
				$("#task, #description, #duedate").val("");
			}
		}
	});
	
	$(".AddToDo").live("click", function(){
		addToDo.dialog('open');
	});
	
	$("#duedate").datepicker();
	
	$("input[type=checkbox]").live("click", function(){
		
		$(this).closest(':data(sortable-item)').find('h3').click().end().slideUp(function () {
		    $(this).remove();
		  });
	});
	
  $(".ui-tabs-panel").setupToDoList();
