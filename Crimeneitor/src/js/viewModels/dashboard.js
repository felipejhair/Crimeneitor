/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */

define(['ojs/ojcore', 'knockout', 'jquery', 'googmap', 'map', 'select', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojselectcombobox'],
 function(oj, ko, $) {

  
    function DashboardViewModel() {
      var self = this;
      
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

      
      self.handleActivated = function(info) {
      };


      self.handleAttached = function(info) {
                  getLocation();


        
     };


      self.handleBindingsApplied = function(info) {
      };


      self.handleDetached = function(info) {
      };
    }

    return new DashboardViewModel();
  }
);


