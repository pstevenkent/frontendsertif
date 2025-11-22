// src/components/classlist.jsx
import React from 'react';

// Komponen reusable untuk menampilkan daftar kelas
function ClassList({ classes, onAction, actionLabel = 'Daftar' }) {
  return (
    <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
      {classes.map(c => (
        <li key={c.id} style={{ margin: '5px 0' }}>
          <strong>{c.name}</strong> (Instruktur: {c.instructor})
          {onAction && (
            <button onClick={() => onAction(c.id)} style={{ marginLeft: '10px' }}>
              {actionLabel}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

export default ClassList;