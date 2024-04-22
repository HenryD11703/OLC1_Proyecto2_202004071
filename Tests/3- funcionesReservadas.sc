
execute funcionesEspecialesYNativas();

void funcionesEspecialesYNativas(){
    int a = 15;
    cout << "------------------TOLOWER-------------------" << endl;
    cout << "SIN TOLOWER" << endl;
    cout << toLower("CON TOLOWER") << endl;
    cout << "------------------TOUPPER-------------------" << endl;
    cout << "sin toupper" << endl;
    cout << toUpper("con toupper") << endl;
    cout << "------------------ROUND-------------------" << endl;
    double c =26.5;
    cout << "sin round: "+c << endl;
    c=round(c);
    cout << "con round "+c << endl;
    double cc=26.4;
    cout << "sin round: "+cc << endl;
    cc=round(cc);
    cout << "con round "+cc << endl;
    cout << "-----------------TYPEOF--------------------" << endl;
    std::string x ="soy una cadena";
    
    int y = 50;
    double z = 78.5;
    char xx = 'a';
    bool yy = true;
    cout << "tipo: "+typeof(x) << endl;
    cout << "tipo: "+typeof(y) << endl;
    cout << "tipo: "+typeof(z) << endl;
    cout << "tipo: "+typeof(xx)  << endl;
    cout << "tipo: "+typeof(yy) << endl;
    cout << "------------------LENGTH-------------------" << endl;
    std::string cadena="soy una cadena";
    cout << "tamaño: "+ cadena.length() << endl;
    cout << "------------------TOSTRING-------------------" << endl;
    int numero=105;
    cout << "tipo: "+typeof(numero) << endl;
    cout << "tipo: "+typeof(std::tostring(numero)) << endl;
    cout << "----------------TOCHARARRAY------------------" << endl;
    std::string texto = "SOY UNA LISTA";
    char listaChar[] = texto.c_str();
    cout << "########imprimiendo lista de caracteres#######" << endl;
    imprimirListaChar(listaChar);
}



void imprimirListaChar(char miLista[] ){
    for (int i = 0; i < miLista.length(); i++) {
        cout << "listaChar[" + i + "] = " + getValue(miLista,i) << endl;
    }
}

char getValue(char miLista[], int index) {
	return miLista[index];
}

/*
--------------------SALIDA ESPERADA-----------------
------------------TOLOWER-------------------
SIN TOLOWER
con tolower
------------------TOUPPER-------------------
sin toupper
CON TOUPPER
------------------ROUND-------------------
sin round: 26.5
con round 27
sin round: 26.4
con round 26
-----------------TYPEOF--------------------
tipo: STRING
tipo: INT
tipo: DOUBLE
tipo: CHAR
tipo: BOOLEAN
------------------LENGTH-------------------
tamaño: 14
------------------TOSTRING-------------------
tipo: INT
tipo: STRING
----------------TOCHARARRAY------------------
########imprimiendo lista de caracteres#######
listaChar[0] = S
listaChar[1] = O
listaChar[2] = Y
listaChar[3] =  
listaChar[4] = U
listaChar[5] = N
listaChar[6] = A
listaChar[7] =  
listaChar[8] = L
listaChar[9] = I
listaChar[10] = S
listaChar[11] = T
listaChar[12] = A
*/