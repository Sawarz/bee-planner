import { React, useState } from 'react'
import styles from './styles.module.css'
import { Field } from 'formik'

const ColorPicker = ({ handleClick }) => {
    const [chosenColor, setChosenColor] = useState(null)

    const colors = ['red', 'green', 'yellow', 'orange', 'blue', 'lime', 'cyan', 'pink', 'purple', 'brown'];

  return (
      <div className={styles.colorPicker}>
          {colors.map((color, i) => {
            let colorClassnames = styles.color;
              if (chosenColor === i) {
                  colorClassnames = styles.color + " " + styles.chosen;
              }
              return <div key={i} className={colorClassnames} style={{ backgroundColor: color }} onClick={(e) => {
                  setChosenColor(i)
                  handleClick(e.target.style.backgroundColor);
              }
              }></div>
          })}
    </div>
  )
}

const fieldName = "color";

export default function ColorInput() {
    return <Field name={fieldName} id={fieldName} type="number">
    {({ field: { value }, form: { setFieldValue } }) => (
      <div>
          <div>
          <ColorPicker
            color={value}
            handleClick={color => setFieldValue(fieldName, color)}
          />
        </div>
      </div>
    )}
  </Field>
}
