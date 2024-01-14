const React = window.unlayer.React;

const Viewer = () => {
  return <div>I am a custom tool.</div>;
};

window.unlayer.registerTool({
  name: "my_tool",
  label: "My Tool",
  icon: "fa-smile",
  supportedDisplayModes: ["web", "email"],
  options: {},
  values: {},
  renderer: {
    Viewer: Viewer,
    exporters: {
      web: function (values) {
        return "<div>I am a custom tool.</div>";
      },
      email: function (values) {
        return "<div>I am a custom tool.</div>";
      },
    },
    head: {
      css: function (values) {},
      js: function (values) {},
    },
  },
});
