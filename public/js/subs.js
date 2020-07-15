setTimeout(function() {
  //Get spanish
  fetch(document.getElementById('subES').innerHTML)
      .then(response => {
          if (!response.ok)
              throw new Error('Network response was not ok')
          return response.blob()
      })
      .then(blob => {
          blob.type = 'text/vtt'
          let bES = URL.createObjectURL(blob)
          document.getElementById('dlES').href = bES
      })
      .catch(error => {
          console.error('There has been a problem with your fetch operation:', error)
      });
  //Get english
  fetch(document.getElementById('subEN').innerHTML)
      .then(response => {
          if (!response.ok)
              throw new Error('Network response was not ok')
          return response.blob()
      })
      .then(blob => {
          blob.type = 'text/vtt'
          let bEN = URL.createObjectURL(blob)
          document.getElementById('dlEN').href = bEN
      })
      .catch(error => {
          console.error('There has been a problem with your fetch operation:', error)
      });
  //Get Portuguese Brazilian
  fetch(document.getElementById('subPB').innerHTML)
    .then(response => {
      if (!response.ok)
        throw new Error('Network response was not ok')
          return response.blob()
        })
    .then(blob => {
      blob.type = 'text/vtt'
      let bPB = URL.createObjectURL(blob)
      document.getElementById('dlPB').href = bPB
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error)
    });
  //Get French
  fetch(document.getElementById('subFR').innerHTML)
    .then(response => {
      if (!response.ok)
        throw new Error('Network response was not ok')
          return response.blob()
        })
    .then(blob => {
      blob.type = 'text/vtt'
      let bFR = URL.createObjectURL(blob)
      document.getElementById('dlFR').href = bFR
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error)
    });
}, 5000);
