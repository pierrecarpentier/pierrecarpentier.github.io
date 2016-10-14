var twodigits = function(number) {
	number = parseInt(number);
  return (number<10 ? '0' : '') + number;
};
var threedigits = function(number) {
	number = parseInt(number);
  return (number<10 ? '00' : (number<100 ? '0' : '')) + number;
};
var date = function() {
    var d = new Date();
    return d.getFullYear() + '-' +
    	twodigits(d.getMonth() + 1) + '-' +
      twodigits(d.getDate()) + 'T' +
      twodigits(d.getHours()) + ':' +
      twodigits(d.getMinutes()) + ':' +
      twodigits(d.getSeconds()) + '.' +
      threedigits(d.getMilliseconds())
    ;
};
var log = function(line) {
    var pre = $('pre');
    var text = pre.text() + date() + '  ' + line + '\n';
    pre.text(text);
};

log('Starting program...');
if (location )
log(':/')
log(':D')
