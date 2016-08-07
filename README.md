# jquery-simpletable
A bootstrap based simple table that supports CRUD operation inside the table.

Demo

How to use :
```
$(*table element*).simpletable(
    options..
);
```

Options :
```
{
    getURL : function(){},
    deleteURL : function(){},
    editURL : function(){},
    addURL : function(){},
    customRenderView : {},
    customRenderEdit : {},
    dataFormatter : function(){},
    format : "form"
}
```

- getURL : function return URI to get all data
- deleteURL : function return URI to delete one data
- editURL : function return URI to change one data
- addURL : function return URI to add one data
- customRenderView : object contains functions to render custom field for View state
- customRenderEdit : object contains functions to render custom field for Edit state
- dataFormatter : function to format data fetched by get operation
format : ("form" or "json") output data sent in REST operation

