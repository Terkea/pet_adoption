const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#F24405", // primary color for all components
              "@layout-header-background": "#F27405",
              "@layout-header-height": "50px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
