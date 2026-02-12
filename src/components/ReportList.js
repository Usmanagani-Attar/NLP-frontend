// Replace your sentiment badge section:
{r.sentiment && (
  <span style={{ backgroundColor: getBadgeColor(r.sentiment), /* ... */ }}>
    {r.sentiment}
  </span>
)}

// WITH:
<span style={{ 
  backgroundColor: r.sentiment ? getBadgeColor(r.sentiment) : '#9e9e9e',
  color: 'white',
  padding: '5px 10px',
  borderRadius: '8px',
  fontSize: '0.9em',
  fontWeight: 'bold'
}}>
  {r.sentiment || 'No sentiment'}
</span>

// Replace keywords section:
{r.keywords && r.keywords.length > 0 && (
  <div>{r.keywords.map(/* ... */)}</div>
)}

// WITH:
<div style={{ marginTop: '10px' }}>
  {r.keywords && r.keywords.length > 0 ? (
    r.keywords.map((kw, idx) => (
      <span key={idx}>#{kw}</span>
    ))
  ) : (
    <span style={{ color: '#999', fontSize: '0.85em' }}>No keywords</span>
  )}
</div>
