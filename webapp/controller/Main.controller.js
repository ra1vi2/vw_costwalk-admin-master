sap.ui.define( [
    "sap/ui/core/mvc/Controller",
    "sap/m/ColorPalettePopover",
    "sap/ui/unified/ColorPickerDisplayMode",
    'sap/m/MessageToast',
    '../utils/addins',
    'sap/m/ResponsivePopover',
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function ( Controller, ColorPalettePopover, ColorPickerDisplayMode, MessageToast, Addins, ResponsivePopover, JSONModel ) {
        "use strict";
        var livehexcode = "";
        var rowselect;
        var oModel;
        var iscolor;

        return Controller.extend( "manage.cw.admin.costwalkadmin.controller.Main", {
            onInit: function () {
                var that = this;
                oModel = this.getOwnerComponent().getModel( "mainService" );
                this.getView().setModel( oModel );

                oModel.read( "/CWADMIN", function ( oData, OResponse ) {
                    alert( oData );
                    that.getView().setModel( oData, "bartype" )
                } )

                var bartype = [
                    {
                        "code": "F",
                        "description": "Full Bar"

                    },
                    {
                        "code": "S",
                        "description": "Step Bar"

                    },


                ]

                var dataModel = new JSONModel( bartype );
                this.getView().setModel( dataModel, "barModel" );
            },
            _colorSelection: function ( oEvent ) {
                var spath = oEvent.getSource().getBindingContext().getPath();
                rowselect = spath;
                if ( !this.oColorPaletteDisplayMode ) {
                    iscolor = this.oColorPaletteDisplayMode;
                    this.oColorPaletteDisplayMode = new ColorPalettePopover( "oColorPaletteDisplayMode", {
                        showDefaultColorButton: false,
                        displayMode: ColorPickerDisplayMode.Simplified,
                        colorSelect: this.handleColorSelect,
                        liveChange: this.handleLiveChange.bind( this )
                    } );
                }

                this.oColorPaletteDisplayMode.openBy( oEvent.getSource() );
            },
            handleColorSelect: function ( oEvent ) {

                var color = oEvent.getParameter( "value" );
                debugger
                if ( livehexcode === "" ) {
                    var hexcode = Addins.getHex( color );
                } else {
                    var hexcode = livehexcode;
                };
                var obj = {
                    "Colorcode": hexcode,
                    "Color": color
                };
                oModel.update( rowselect, obj );
                MessageToast.show( "Color Selected: value - " + hexcode );
                if ( this.oColorPaletteDisplayMode ) {
                    this.oColorPaletteDisplayMode.destroy();
                }
            },

            onExit: function () {
                livehexcode = "";
                if ( this.oColorPaletteDisplayMode ) {
                    this.oColorPaletteDisplayMode.destroy();
                }
            },

            handleLiveChange: function ( oEvent ) {
                var hexcode = oEvent.getParameter( "hex" );
                livehexcode = hexcode;
            }

        } );
    } );
