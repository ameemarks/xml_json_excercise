/**
 * Created by ania on 12/9/16.
 */

document.addEventListener("DOMContentLoaded", function(event) {

    /*var xmlText = "<CATALOG><AB id='pierwsza' class='pierwszaPlyta' ulubiona='nie'><TITLE>Empire Burlesque</TITLE><SUBTITLE>Far far away</SUBTITLE><ARTIST>Bob Dylan</ARTIST><COUNTRY>USA</COUNTRY><COMPANY>Columbia</COMPANY><PRICE><BRUTTO>10.90</BRUTTO><NETTO>9.90</NETTO></PRICE><YEAR><MADE_IN>1985</MADE_IN><PUBLISHED>1986</PUBLISHED></YEAR></AB><CD><TITLE>Hide your heart</TITLE><ARTIST>Bonnie Tyler</ARTIST><COUNTRY>UK</COUNTRY><COMPANY>CBS Records</COMPANY><PRICE>9.90</PRICE><YEAR>1988</YEAR></CD><CD><TITLE>Greatest Hits</TITLE><ARTIST>Dolly Parton</ARTIST><COUNTRY>USA</COUNTRY><COMPANY>RCA</COMPANY></CD><CD><TITLE>Still got the blues</TITLE><ARTIST>Gary Moore</ARTIST><COUNTRY>UK</COUNTRY><COMPANY>Virgin records</COMPANY><PRICE>10.20</PRICE><YEAR>1990</YEAR></CD><CD><TITLE>Eros</TITLE><ARTIST>Eros Ramazzotti</ARTIST><COUNTRY>EU</COUNTRY><COMPANY>BMG</COMPANY><PRICE>9.90</PRICE><YEAR>1997</YEAR></CD><CD><TITLE>Sylvias Mother</TITLE><ARTIST>Dr.Hook</ARTIST><COUNTRY>UK</COUNTRY><COMPANY>CBS</COMPANY><PRICE>8.10</PRICE><YEAR>1973</YEAR></CD></CATALOG>";
*/
    //http://examples.oreilly.com/9780596002527/
    var xmlText = '<book id="b0836217462" available="true"><isbn>0836217462</isbn><title lang="en">Being a Dog Is a Full-Time Job</title><author id="CMS"><name>Charles M Schulz</name><born>1922-11-26</born><dead>2000-02-12</dead></author><character id="PP"><name>Peppermint Patty</name><born>1966-08-22</born><qualification>bold, brash and tomboyish</qualification></character><character id="Snoopy"><name>Snoopy</name><born>1950-10-04</born><qualification>extroverted beagle</qualification></character><character id="Schroeder"><name>Schroeder</name><born>1951-05-30</born><qualification>brought classical music to the Peanuts strip</qualification></character><character id="Lucy"><name>Lucy</name><born>1952.03.03</born><qualification>bossy, crabby and selfish</qualification></character></book>';

    //http://www.w3schools.com/xml/schema_example.asp
    /*var xmlText = '<shiporder orderid="889923" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="shiporder.xsd"><orderperson>John Smith</orderperson><shipto><name>Ola Nordmann</name><address>Langgt 23</address><city>4000 Stavanger</city><country>Norway</country></shipto><item><title>Empire Burlesque</title><note>Special Edition</note><quantity>1</quantity><price>10.90</price></item><item><title>Hide your heart</title><quantity>1</quantity><price>9.90</price></item></shiporder>';*/

    /*var xmlText = '<notePad>Notatnik<note1><date><day>2</day><month>1</month><year>2005</year></date><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don\'t forget me this weekend!</body></note1><note2><date><day>12</day><month>11</month><year>2002</year></date><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don\'t forget me this weekend!</body></note2><note3></note3><note4>Czwarta notatka</note4></notePad>';*/

    console.log(xmlText);
    //document.getElementById("sample").innerHTML = xmlText;

    function parseXML(val) {
        /*
        * sprawdza, czy dana przeglądarka potrafi utworzyć dokument XML
        * jeśli tak, to tworzy obiekt DOMParser i za pomocą metody parseFromString
        * parsuje wartość zmiennej przekazanej w parametrze do xml
        * 'text/xml' specifies the content type of the string to parse
        */
        if (document.implementation && document.implementation.createDocument) {
            xmlDoc = new DOMParser().parseFromString(val, 'text/xml');
        }

        /*
        *dla IE
        * */
        else if (window.ActiveXObject) {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.loadXML(val);
        }
        else
        {
            alert("Your browser can't handle this script");
            return null;
        }
        return xmlDoc;
    }

    var xmlOutput;


    window.onload = function() {
        xmlOutput = parseXML(xmlText);
        var rootElement = xmlOutput.documentElement;
        var secondLevelNodes = rootElement.childNodes;

        var array = [];

        if (rootElement.hasChildNodes()) {
            for (var i = 0; i < secondLevelNodes.length; i++) {
                if (secondLevelNodes[i].nodeType == 1) {   //nodeType = 1 => element_node

                    var nameOfNode = secondLevelNodes[i].nodeName;
                    var childrenAmount = 0;

                    //zlicza ilość dzieci elementu secondLevelNodes tylko wtedy, gdy one same są elementami
                    for (var j = 0; j < secondLevelNodes[i].childNodes.length; j++) {
                        if (secondLevelNodes[i].childNodes[j].nodeType == 1) {
                            var childrenAmount = secondLevelNodes[i].childNodes.length;
                        }
                    }

                    array.push({nodeName: nameOfNode, nodeChildrenAmount: childrenAmount});

                }
                else if (secondLevelNodes[i].nodeType == 3) {
                    array.push({nodeType: "text", nodeName: "none", nodeChildrenAmount: "none"});
                }
                else {
                    alert ("ChildNode nie jest elementem ani textem")
                }

            }
        }

        else {
            alert ("Root XML jest pusty");
        }

        /*stworzenie obiektu, zawierającego tablicę obiektów z array*/
        var obj = {secondLevelNodes: array};

        /*konwersja obiektu na JSON*/
        var jsonText = JSON.stringify(obj, undefined, 2);

        document.getElementById("demo").innerHTML = jsonText;

        /* Javascript xml pretty print - Stuart Powers< */
        function formatXml(xml) {
            var formatted = '';
            var reg = /(>)(<)(\/*)/g;
            xml = xml.replace(reg, '$1\r\n$2$3');
            var pad = 0;
            jQuery.each(xml.split('\r\n'), function(index, node) {
                var indent = 0;
                if (node.match( /.+<\/\w[^>]*>$/ )) {
                    indent = 0;
                } else if (node.match( /^<\/\w/ )) {
                    if (pad != 0) {
                        pad -= 1;
                    }
                } else if (node.match( /^<\w[^>]*[^\/]>.*$/ )) {
                    indent = 1;
                } else {
                    indent = 0;
                }

                var padding = '';
                for (var i = 0; i < pad; i++) {
                    padding += '  ';
                }

                formatted += padding + node + '\r\n';
                pad += indent;
            });

            return formatted;
        }

        xml_raw = xmlText;

        xml_formatted = formatXml(xml_raw);

        xml_escaped = xml_formatted.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/ /g, '&nbsp;').replace(/\n/g,'<br />');

        document.getElementById("sample").innerHTML = xml_escaped;
    };
    /* end of snippet from: https://gist.github.com/sente/1083506 */

});
