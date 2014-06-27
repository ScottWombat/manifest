define(["application", 'utils/templateManager',"text!commons/ui/dialog/login_form_html", "backbone.syphon"],
       function(App, TemplateManager,tpl){
  App.module("App.Common.Views", function(Views,App, Backbone, Marionette, $, _){
    Views.Form = Marionette.ItemView.extend({
      template: TemplateManager.getTemplate(tpl),

      events: {
        "click button.js-submit": "submitClicked"
      },

      submitClicked: function(e){
        e.preventDefault();
        var data = Backbone.Syphon.serialize(this);
        this.trigger("form:submit", data);
      },

      onFormDataInvalid: function(errors){
        var $view = this.$el;

        var clearFormErrors = function(){
          var $form = $view.find("form");
          $form.find(".help-inline.error").each(function(){
            $(this).remove();
          });
          $form.find(".control-group.error").each(function(){
            $(this).removeClass("error");
          });
        }

        var markErrors = function(value, key){
          var $controlGroup = $view.find("#contact-" + key).parent();
          var $errorEl = $("<span>", { class: "help-inline error", text: value });
          $controlGroup.append($errorEl).addClass("error");
        }

        clearFormErrors();
        _.each(errors, markErrors);
      }
    });
  });

  return App.Common.Views;
});