sap.ui.define( [], function () {
    "use strict";

    return {
        getHex: function ( colorStr ) {

            return this.hexfromcolor( colorStr );

        },

        hexfromcolor: function ( colorstr ) {
            var colors = {
                "gold": "#ffd700",
                "darkorange": "#ff8c00",
                "indianred": "#cd5c5c",
                "darkmagenta": "#8b008b",
                "cornflowerblue": "#6495ed",
                "deepskyblue": "#00bfff",
                "darkcyan": "#008b8b",
                "olivedrab": "#6b8e23",
                "darkslategray": "#2f4f4f",
                "azure": "#f0ffff",
                "white": "#ffffff",
                "lightgray": "#d3d3d3",
                "darkgray": "#a9a9a9",
                "dimgray": "#696969",
                "black": "#000000"
            }
            return colors[colorstr.toLowerCase()]
        }

    }
} );

