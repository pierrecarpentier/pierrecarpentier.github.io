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

var random_choice = function(list) {
		return list[Math.floor(Math.random() * list.length)];
};
var generate_text = function(template) {
    var re = /\[([^\[\]]+)\]/;
    var text = template;
    while (re.test(text)) {
    		text = text.replace(re, function(match, contents) {
        		return random_choice(contents.split('/'));
        });
    }
    return text;
};
var generate_html = function(template) {
    return '<html><head></head><body><p>' + generate_text(template).replace(/\n/g, '</p><p>') + '</p></body></html>';
};

var body_template = '[Bonjour/Bonsoir/Madame, Monsieur/Monsieur, Madame],\n[[Etant actuellement/Actuellement] [à la/en]/[A la/En]] recherche d[\'un/e] stage, votre [entreprise/compagnie] a [attiré/retenu] mon attention.\n[Je me permets donc de vous adresser/Je vous adresse donc/Acceptez s\'il vous plaît/Veuillez accepter/Merci d\'accepter] ma candidature[ [pour/à] un poste [chez vous/[au sein de/dans] votre [entreprise/compagnie]]/].\n[[A[uri/v]ez-vous/[Y a/Reste/Existe]-t-il] des /Dispos[eri/]ez-vous d\']offres [à p[ourvoi/ropose]r/de poste] ?\n[[Bien c/Très c/C]ordialement/En vous remerciant[ d\'avance/]][,/]\n[Pierre Carpentier/Carpentier Pierre]';
var subject_template = '[Candidature [/[à/pour] un]/Recherche[ de/]] stage';

log('Starting program...');
var token = location.hash.split('access_token=')[1].split('&')[0];
log('Retreived token: ' + token);
log('Send email...');
$.ajax(
    url: 'https://outlook.office.com/api/v2.0/me/sendmail',
    dataType: 'application/json',
    data: {
        Message: {
            Subject: generate_text(subject_template),
	    Body: {
    	        ContentType: 'HTML',
	        Content: generate_html(body_template)
	    },
	    ToRecipients: [{
	        EmailAddress: {
		    Address: 'pierre.carpentier@mail.com'
	        }
	    }]
        },
        SaveToSentItems: true
    },
    success: function(data, status) {
        log('...success, got response: ' + status);
    },
    error: function(data, status) {
        log('...error, got response: ' + status);
    },
    beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + token); }
});
       
       
       
