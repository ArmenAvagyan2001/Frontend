function areStatePropsEqual(next, prev) {
  if (JSON.stringify(next) === JSON.stringify(prev)) 
    return true
  else 
    return false
  
}

export default areStatePropsEqual