dpd.template.get({id:this.TemplateID}, function(result, err){
    if(err) return console.log(err);
    this.template = result;
});