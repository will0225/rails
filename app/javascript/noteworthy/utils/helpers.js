export function resizeSlider() {
  document.querySelectorAll('.playlistSlideText').forEach(function(elem, index){
    let picWidth = parseInt(elem.closest('.playlistSliderItem').querySelectorAll('.pic')[0].offsetWidth)
    elem.closest('.playlistSliderItem').querySelectorAll('.pic')[0].style.height = picWidth + 'px'
    elem.style.height = (parseInt(elem.closest('.playlistSliderItem').offsetHeight) - picWidth) / 2 + 'px'
  })
}

export function secondsToTime (seconds) {
  var sec_num = parseInt(seconds, 10); // don't forget the second param
  var minutes = Math.floor((sec_num) / 60);
  var seconds = sec_num - (minutes * 60);

  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return minutes + ':' + seconds;
}

export function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return a;
}

export function intersperse(arr, sep) {
  if (arr.length === 0) {
    return [];
  }

  return arr.slice(1).reduce(function(xs, x, i) {
    return xs.concat([sep, x]);
  }, [arr[0]]);
}

export function arrEqual(array1, array2) {
  return array1.length === array2.length && array1.every((value, index) => value === array2[index])
}

export function toHHMMSS (string) {
  var sec_num = parseInt(string, 10); // don't forget the second param
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours+':'+minutes+':'+seconds;
}