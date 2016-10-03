/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */

define(['ojs/ojcore', 'knockout', 'jquery', 'googmap', 'map', 'ojs/ojrouter', 'ojs/ojknockout'],
 function(oj, ko, $) {
  
    function DashboardViewModel() {
      var self = this;
      
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

      
      self.handleActivated = function(info) {
        // Implement if needed
      };


      self.handleAttached = function(info) {
        getLocation();
      };


      self.handleBindingsApplied = function(info) {
        // Implement if needed
      };


      self.handleDetached = function(info) {
        // Implement if needed
      };
    }

    return new DashboardViewModel();
  }
);


