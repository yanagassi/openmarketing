import { FormGroup, Input, Label } from "reactstrap";

function DefaultOptions({ updateSectionStyles, activeSectionValues }) {
  return (
    <>
      <FormGroup>
        <Label for="exampleEmail">Cor de Fundo</Label>
        <Input
          value={activeSectionValues?.styles?.backgroundSectionColor}
          onChange={({ target }) =>
            updateSectionStyles("backgroundSectionColor", target.value)
          }
          type="color"
        />
      </FormGroup>

      <FormGroup>
        <Label for="exampleEmail">Altura da Pagina</Label>
        <Input
          type="number"
          value={activeSectionValues?.styles?.height}
          onChange={({ target }) => updateSectionStyles("height", target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label for="exampleEmail">Opacidade da Pagina</Label>
        <Input
          type="number"
          value={activeSectionValues?.styles?.sectionOpacity}
          max={100}
          min={0}
          maxLength={3}
          onChange={({ target }) =>
            updateSectionStyles("sectionOpacity", parseInt(target.value))
          }
        />
      </FormGroup>
    </>
  );
}

export default DefaultOptions;
