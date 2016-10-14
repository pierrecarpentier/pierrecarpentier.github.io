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

var template = '[Bonjour/Bonsoir/Madame, Monsieur/Monsieur, Madame],\n[[Etant actuellement/Actuellement] [à la/en]/[A la/En]] recherche d[\'un/e] stage, votre [entreprise/compagnie] a [attiré/retenu] mon attention.\n[Je me permets donc de vous adresser/Je vous adresse donc/Acceptez s\'il vous plaît/Veuillez accepter/Merci d\'accepter] ma candidature[ [pour/à] un poste [chez vous/[au sein de/dans] votre [entreprise/compagnie]]/].\n[[A[uri/v]ez-vous/[Y a/Reste/Existe]-t-il] des /Dispos[eri/]ez-vous d\']offres [à p[ourvoi/ropose]r/de poste] ?\n[[Bien c/Très c/C]ordialement/En vous remerciant[ d\'avance/]][,/]\n[Pierre Carpentier/Carpentier Pierre]';
var random_choice = function(list) {
		return list[Math.floor(Math.random() * list.length)];
};
var generate_text = function() {
		var re = /\[([^\[\]]+)\]/;
    var text = template;
    while (re.test(text)) {
    		text = text.replace(re, function(match, contents) {
        		return random_choice(contents.split('/'));
        });
    }
    return text;
};
var generate_html = function() {
		return '<html><head></head><body><p>' + generate_text().replace(/\n/g, '</p><p>') + '</p></body></html>';
};

log('Starting program...');
var token = location.hash.split('access_token=')[1].split('&')[0];
log('Retreived token: ' + token);
