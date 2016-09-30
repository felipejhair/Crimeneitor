/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */








 define(['ojs/ojcore', 'knockout','login', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource',
  'ojs/ojoffcanvas'],
  function(oj, ko) {
   function ControllerViewModel() {
     var self = this;
     



      // Media queries for repsonsive layouts
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
      var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
      self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

       // Router setup
       self.router = oj.Router.rootInstance;
       self.router.configure({
         'dashboard': {label: 'Mapa', isDefault: true},
         'incidents': {label: 'Zonas'},
         'customers': {label: 'Ingresar'},
         'about': {label: 'Acerca de'}
       });
       oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

      // Navigation setup
      var navData = [
      {name: 'Mapa', id: 'dashboard',
      iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'},
      {name: 'Zonas', id: 'incidents',
      iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'},
      {name: 'Ingresar', id: 'customers',
      iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'},
      {name: 'Acerca de', id: 'about',
      iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24'}
      ];
      self.navDataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});

      // Drawer
      // Called by nav drawer option change events so we can close drawer after selection
      self.navChangeHandler = function (event, data) {
       if (data.option === 'selection' && data.value !== self.router.stateId()) {
         self.toggleDrawer();
       }
     }
      // Close offcanvas on medium and larger screens
      self.mdScreen.subscribe(function() {oj.OffcanvasUtils.close(self.drawerParams);});
      self.drawerParams = {
        displayMode: 'push',
        selector: '#navDrawer',
        content: '#pageContent'
      };
      // Called by navigation drawer toggle button and after selection of nav drawer item
      self.toggleDrawer = function() {
        return oj.OffcanvasUtils.toggle(self.drawerParams);
      }



      // Header

      // Application Name used in Branding Area
      self.appName = ko.observable("Crimeneitor");
      // User Info used in Global Navigation area
      $("#logo").css("background","url(../../web/css/images/crimen.png)");





      // Footer
      function footerLink(name, id, linkTarget) {
        this.name = name;
        this.linkId = id;
        this.linkTarget = linkTarget;
      }


      
        self.nambr="invitado";

    

      
      
      self.footerLinks = ko.observableArray([
        new footerLink('Acerca de Crimeneitor', 'aboutOracle', 'http://www.oracle.com/us/corporate/index.html#menu-about'),
        new footerLink('Contacto', 'contactUs', 'http://www.oracle.com/us/corporate/contact/index.html'),
        new footerLink('Terminos de uso', 'legalNotices', 'http://www.oracle.com/us/legal/index.html'),
        new footerLink('Fime', 'termsOfUse', 'http://www.oracle.com/us/legal/terms/index.html'),
        new footerLink('Politica de Privacidad', 'yourPrivacyRights', 'http://www.oracle.com/us/legal/privacy/index.html')
        ]);


    }

    return new ControllerViewModel();
  }
  );
