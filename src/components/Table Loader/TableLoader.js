import React from "react";
import "./tableLoader.css";

export default function TableLoader({ noOftd }) {
  const rows = Array.from({ length: 5 }, (_, index) => (
    <tr key={index} className="animated_tr">
      {Array.from({ length: noOftd }, (__, columnIndex) => (
        <td key={columnIndex}></td>
      ))}
    </tr>
  ));

  return <tbody>{rows}</tbody>;
}
