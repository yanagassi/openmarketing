const INIT_STATE = {
properties: [
{
id: comum.GenerateId().toString(),
styles: {
backgroundSectionColor: "#006bb3",
sectionOpacity: 100,
height: 300,
},
items: [
{
id: comum.GenerateId().toString(),
content: {
text: "texto",
color: "#FFFFFF",
fontSize: 12,
},
position: { x: 0, y: 0 },
type: LP_HTML_COMPONENTS_TYPE.span,
},
{
id: comum.GenerateId().toString(),
content: {
src: "",
width: 100,
height: 100,
resizeMode: "cover",
},
position: { x: 100, y: 100 },
type: LP_HTML_COMPONENTS_TYPE.img,
},
],
},
{
id: comum.GenerateId().toString(),
styles: {
backgroundSectionColor: "#006bb3",
sectionOpacity: 100,
height: 300,
},
items: [],
},
],
};
