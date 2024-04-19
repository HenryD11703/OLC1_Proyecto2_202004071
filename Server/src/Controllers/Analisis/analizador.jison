%{
    
    const Tipo = require('./Analisis/Simbolo/Tipo');

    const Nativo = require('./Analisis/Expresiones/Nativo');
    const Aritmetica = require('./Analisis/Expresiones/Aritmetica');
    const Logica = require('./Analisis/Expresiones/Logica');
    const AccesoVar = require('./Analisis/Expresiones/AccessVar');  
    const OpTernaria = require('./Analisis/Expresiones/OperacionTernaria');
    const Casteos = require('./Analisis/Expresiones/Casteos');
    const AccesoVec = require('./Analisis/Expresiones/AccesoVec');
    const toLower = require('./Analisis/Expresiones/toLower');
    const toUpper = require('./Analisis/Expresiones/toUpper');
    const Round = require('./Analisis/Expresiones/Round');
    const Length = require('./Analisis/Expresiones/Length');
    const TypeOf = require('./Analisis/Expresiones/TypeOf');
    const toStr = require('./Analisis/Expresiones/toString');
 

    const Imprimir = require('./Analisis/Instrucciones/Impresion');
    const DeclaracionVar = require('./Analisis/Instrucciones/Declaracion');
    const AsignacionVar = require('./Analisis/Instrucciones/VariablesA');
    const Incremento = require('./Analisis/Instrucciones/Incremento'); 
    const Bloque = require('./Analisis/Instrucciones/Bloque');
    const funcionIf = require('./Analisis/Instrucciones/FuncionIf'); 
    const Break = require('./Analisis/Instrucciones/Break');
    const Continue = require('./Analisis/Instrucciones/Continue');
    const FuncionWhile = require('./Analisis/Instrucciones/FuncionWhile');
    const FuncionFor = require('./Analisis/Instrucciones/FuncionFor');
    const FuncionDo = require('./Analisis/Instrucciones/FuncionDo');
    const Return = require('./Analisis/Instrucciones/Return');
    const DeclaracionArr = require('./Analisis/Instrucciones/DeclaracionArr');
    const VectorA = require('./Analisis/Instrucciones/VectorA');
    const DeclaracionCstr = require('./Analisis/Instrucciones/DeclaracionCstr');
    const Caso = require('./Analisis/Instrucciones/Caso');
    const funcionSwitch = require('./Analisis/Instrucciones/FuncionSwitch');
    const Default = require('./Analisis/Instrucciones/Default');
    const Funcion = require('./Analisis/Instrucciones/Funcion');
    const Llamada = require('./Analisis/Instrucciones/Llamada');
    const Execute = require('./Analisis/Instrucciones/Execute');
     


%}

%lex 

%options case-insensitive
%x string

%%

\s+                                 //ignora espacios

["]				{ cadena = ''; this.begin("string"); }
<string>[^"\\]+			{ cadena += yytext; }
<string>"\\\""			{ cadena += "\""; }
<string>"\n"			{ cadena += "\n"; }
<string>\s			{ cadena += " ";  }
<string>"\t"			{ cadena += "\t"; }
<string>"\\\\"			{ cadena += "\\"; }
<string>"\'"			{ cadena += "\'"; }
<string>"\r"			{ cadena += "\r"; }
<string>["]		        { yytext = cadena; this.popState(); return 'CADENA'; }

\/\/([^\n])*                {};//ignora comentarios de una línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] {};//ignora comentarios de varias líneas
[0-9]+("."[0-9]+)+\b        return 'DECIMAL';
[0-9]+                      return 'NUMERO';
"EXEC"                      return 'EXEC';
"(int)"                      return 'PINTP';
"int"                       return 'INT';
"(double)"                   return 'PDOUBLEP';
"double"                    return 'DOUBLE';
"bool"                      return 'BOOL';
"char"                      return 'CHAR';
"(char)"                    return 'PCHARP';
"std"                       return 'STD';
"string"                    return 'STRING';
"(string)"                  return 'PSTRINGP';
"pow"                       return 'POW';
"new"                       return 'NEW';
"true"                      return 'TRUE';
"false"                     return 'FALSE';
"if"                        return 'IF';
"else"                      return 'ELSE';
"switch"                    return 'SWITCH';
"case"                      return 'CASE';
"default"                   return 'DEFAULT';
"while"                     return 'WHILE';
"break"                     return 'BREAK';
"for"                       return 'FOR';
"do"                        return 'DO';
"continue"                  return 'CONTINUE';
"return"                    return 'RETURN';
"void"                      return 'VOID';
"cout"                      return 'COUT';
"endl"                      return 'ENDL';
"tolower"                   return 'TOLOWER';
"toupper"                   return 'TOUPPER';
"length"                    return 'LENGTH';
"round"                     return 'ROUND';
"typeof"                    return 'TYPEOF';
"toString"                  return 'TOSTRING';
".c_str"                     return 'C_STR';
"execute"                   return 'EXECUTE';
// Simbolos para la gramática
"++"                        return 'MASMAS';
"--"                        return 'MENOSMENOS';
"."                         return 'PUNTO';
'"'                         return 'COMILLAS';
 
[']\\\\[']|[']\\\"[']|[']\\\'[']|[']\\n[']|[']\\t[']|[']\\r[']|['].?['] { yytext = yytext.substring(1, yytext.length-1); return 'CARACTER'; }
"'"                         return 'COMILLA';
"\\\\"                      return 'BARRA'; 

"*"                         return 'MUL';
":"                         return 'DOSPUNTOS';
"+"                         return 'MAS';
"-"                         return 'RES';
"("                         return 'PARENTESISI';
")"                         return 'PARENTESISD';
","                         return 'COMA';
"%"                         return 'MOD';
"=="                        return 'IGUALIGUAL';
"="                         return 'IGUAL';
"!="                        return 'DIFERENTE';
"!"                         return 'NOT';
"<="                        return 'MENORIGUAL';
"<<"                        return 'MENORMENOR';
"<"                         return 'MENOR';
">="                        return 'MAYORIGUAL';
">"                         return 'MAYOR';
"?"                         return 'INTERROGACION';
"||"                        return 'OR';
"&&"                        return 'AND';
";"                         return 'PYC';
"{"                         return 'LLAVEI';
"}"                         return 'LLAVED';
"["                         return 'CORCHETEI';
"]"                         return 'CORCHETED';
([a-zA-z])[a-zA-Z0-9_]*     return 'ID';
"/"                         return 'DIV';

<<EOF>>                     return 'EOF';
.					        {console.log(yylloc.first_line, yylloc.first_column,'Lexico',yytext);}

%{
    
%}
// Finaliza parte de Léxica
/lex

// precedencia
 
%left 'INTERROGACION', 'PUNTO'
%left 'OR'
%left 'AND'
%right 'NOT' ,'tipoDestino' 
%left 'IGUALIGUAL','DIFERENTE','MENOR','MENORIGUAL','MAYOR','MAYORIGUAL'
%right 'RES'
%nonassoc 'POW'  
%left 'MAS','RES'
%left 'MUL','DIV','MOD'
%right 'UMENOS'





// Inicio de gramática
%start inicio

// Parte sintáctica  - Definición de la gramática
%%
 

inicio : codigos EOF                       {return $1;}
;

codigos : codigos codigo                        { $1.push($2); $$ = $1;}
              | codigo                          { $$ = [$1]; }

;
codigo : declaracionv  PYC                 { $$ = $1; }
       | impresion                         { $$ = $1; }   
       | incrementoDec PYC                    { $$ = $1; }   
       | funcionIf                         { $$ = $1; }
       | funcionBreak                      { $$ = $1; }
       | funcionWhile                      { $$ = $1; }
       | funcionFor                        { $$ = $1; }
       | funciondo                         { $$ = $1; }
       | funcionContinue                   { $$ = $1; }    
       | funcionReturn                     { $$ = $1; }
       | declaracionArr                    { $$ = $1; }
       | modificacionVector  PYC           { $$ = $1; } 
       | funcionSwitch                     { $$ = $1; }
       | funciones                         { $$ = $1; }
       | llamada PYC                       { $$ = $1; }
       | execute                            { $$ = $1; }
;
//constructor(id: string, parametros: Instruccion[], linea: number, columna: number){
execute: EXECUTE ID PARENTESISI PARENTESISD PYC                      { $$ = new Execute.default($2, [], @1.first_line, @1.first_column); }
       | EXECUTE ID PARENTESISI parametros_llamada PARENTESISD PYC   { $$ = new Execute.default($2, $4, @1.first_line, @1.first_column); }
;

funciones : tipo ID PARENTESISI parametros PARENTESISD LLAVEI codigos LLAVED { $$ = new Funcion.default($1, $2, $4, $7, @1.first_line, @1.first_column); }
          | tipo ID PARENTESISI PARENTESISD LLAVEI codigos LLAVED            { $$ = new Funcion.default($1, $2, [], $6, @1.first_line, @1.first_column); }
;

parametros : parametros COMA tipo ID       {$1.push({tipo:$3, id:$4}); $$ = $1;}
           | tipo ID                     { $$ = [{tipo:$1, id:$2}]; }
; 

llamada : ID PARENTESISI parametros_llamada PARENTESISD        { $$ = new Llamada.default($1, $3, @1.first_line, @1.first_column);}
        | ID PARENTESISI PARENTESISD                           { $$ = new Llamada.default($1, [], @1.first_line, @1.first_column); }
;

parametros_llamada : parametros_llamada COMA expresion      { $1.push($3); $$ = $1; }
                   | expresion                              { $$ = [$1]; }
;

declaracionv: tipo ids                         { $$ = new DeclaracionVar.default($1, @1.first_line, @1.first_column, $2, new Nativo.default($1, null, @1.first_line, @1.first_column)); }                 
            | tipo ids IGUAL expresion          { $$ = new DeclaracionVar.default($1, @1.first_line, @1.first_column, $2, $4); }  
            | ids IGUAL expresion               { $$ = new AsignacionVar.default($1, $3, @1.first_line, @1.first_column); }                                
;
ids : ID                                    { $$ = [$1]; }                                                                   
    | ids COMA ID                           { $1.push($3); $$ = $1; }                         
;
tipo : INT                                      { $$ = new Tipo.default(Tipo.TipoDato.ENTERO); } 
     | DOUBLE                                   { $$ = new Tipo.default(Tipo.TipoDato.DECIMAL); }
     | BOOL                                     { $$ = new Tipo.default(Tipo.TipoDato.BOOLEANO); }
     | CHAR                                     { $$ = new Tipo.default(Tipo.TipoDato.CARACTER); }
     | STD DOSPUNTOS DOSPUNTOS STRING           { $$ = new Tipo.default(Tipo.TipoDato.CADENA); }
     | VOID                                     { $$ = new Tipo.default(Tipo.TipoDato.VOID); }
;
expresion : Casteos                             { $$ = $1; }
          | NUMERO                               { $$ = new Nativo.default(new Tipo.default(Tipo.TipoDato.ENTERO), $1, @1.first_line, @1.first_column);}
          | DECIMAL                              { $$ = new Nativo.default(new Tipo.default(Tipo.TipoDato.DECIMAL), $1, @1.first_line, @1.first_column);}
          | CADENA                               { $$ = new Nativo.default(new Tipo.default(Tipo.TipoDato.CADENA), $1, @1.first_line, @1.first_column);}
          | TRUE                                 { $$ = new Nativo.default(new Tipo.default(Tipo.TipoDato.BOOLEANO), true, @1.first_line, @1.first_column);}
          | FALSE                                { $$ = new Nativo.default(new Tipo.default(Tipo.TipoDato.BOOLEANO), false, @1.first_line, @1.first_column);}
          | ID                                   { $$ = new AccesoVar.default($1, @1.first_line, @1.first_column);} 
          | PARENTESISI expresion PARENTESISD    { $$ = $2; }
          | operacion                            { $$ = $1; }
          | CARACTER                             { $$ = new Nativo.default(new Tipo.default(Tipo.TipoDato.CARACTER), $1, @1.first_line, @1.first_column);}
          | ternaryOp                            { $$ = $1; }
          | operacionRelacional                  { $$ = $1; } 
          | accesoVector                         { $$ = $1; }
          | funcToLower                          { $$ = $1; }
          | funcToUpper                          { $$ = $1; }
          | funcionRound                         { $$ = $1; }
          | funcionLength                        { $$ = $1; }
          | funcionTypeOf                        { $$ = $1; }
          | funciontoString                      { $$ = $1; }
          | llamada                              { $$ = $1; } //lamada puede ser una expresion por que puede retornar un valor que sea asignado a una variable o sera retornado
 
        
;

operacion : expresion MAS expresion              { $$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.SUMA,@1.first_line, @1.first_column, $1, $3);}     
          | expresion RES expresion              { $$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.RESTA,@1.first_line, @1.first_column, $1, $3);}
          | expresion MUL expresion              { $$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.MULTIPLICACION,@1.first_line, @1.first_column, $1, $3);}
          | expresion DIV expresion              { $$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.DIVISION,@1.first_line, @1.first_column, $1, $3);}
          | expresion MOD expresion              { $$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.MODULO,@1.first_line, @1.first_column, $1, $3);}
          | POW PARENTESISI expresion COMA expresion PARENTESISD { $$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.POTENCIA,@1.first_line, @1.first_column, $3, $5);}
          | RES expresion %prec UMENOS           { $$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.NEGACION,@1.first_line, @1.first_column, $2);}        
;

operacionRelacional : expresion IGUALIGUAL expresion { $$ = new Logica.default(Logica.OperadorLogico.IGUALIGUAL,@1.first_line, @1.first_column, $1, $3);}
                    | expresion DIFERENTE expresion  { $$ = new Logica.default(Logica.OperadorLogico.DIFERENTE,@1.first_line, @1.first_column, $1, $3);}
                    | expresion MENOR expresion      { $$ = new Logica.default(Logica.OperadorLogico.MENOR,@1.first_line, @1.first_column, $1, $3);}
                    | expresion MENORIGUAL expresion { $$ = new Logica.default(Logica.OperadorLogico.MENORIGUAL,@1.first_line, @1.first_column, $1, $3);}
                    | expresion MAYOR expresion      { $$ = new Logica.default(Logica.OperadorLogico.MAYOR,@1.first_line, @1.first_column, $1, $3);}
                    | expresion MAYORIGUAL expresion { $$ = new Logica.default(Logica.OperadorLogico.MAYORIGUAL,@1.first_line, @1.first_column, $1, $3);}
                    | expresion OR expresion         { $$ = new Logica.default(Logica.OperadorLogico.OR,@1.first_line, @1.first_column, $1, $3);}
                    | expresion AND expresion        { $$ = new Logica.default(Logica.OperadorLogico.AND,@1.first_line, @1.first_column, $1, $3);}
                    | NOT expresion                  { $$ = new Logica.default(Logica.OperadorLogico.NOT,@1.first_line, @1.first_column, $2);}
;                    
/*
Para la impresion la primera regla es para imprimir sin salto de linea, la segunda regla es para imprimir con salto de linea
*/
impresion : COUT MENORMENOR expresion   PYC                     {$$ = new Imprimir.default($3,"", @1.first_line, @1.first_column);}
           |COUT MENORMENOR expresion MENORMENOR ENDL PYC       {$$ = new Imprimir.default($3,"\n", @1.first_line, @1.first_column);}     
;

//Basicamente toca eveluar la expresion si es verdadera retorna un true y se asigna el valor de la primera expresion, sino la segunda
ternaryOp : expresion INTERROGACION expresion DOSPUNTOS expresion  { $$ = new OpTernaria.default($1, $3, $5, @1.first_line, @1.first_column); }
;
 
incrementoDec : ID MASMAS                              { $$ = new Incremento.default($1, "++", @1.first_line, @1.first_column); } 
              | ID MENOSMENOS                          { $$ = new Incremento.default($1, "--", @1.first_line, @1.first_column); }
;
 
Casteos :   tipoDestino  expresion { $$ = new Casteos.default($1, $2, @1.first_line, @1.first_column); }
;
tipoDestino : PINTP                                      { $$ = Casteos.TipoCasteo.aENTERO; }
            | PDOUBLEP                                   { $$ = Casteos.TipoCasteo.aDECIMAL; } 
            | PCHARP                                     { $$ = Casteos.TipoCasteo.aCARACTER; }
            | PSTRINGP                                   { $$ = Casteos.TipoCasteo.aCADENA; }
;

funcionIf :   IF PARENTESISI expresion PARENTESISD bloqueCodigo                     { $$ = new funcionIf.default($3, $5, null, @1.first_line, @1.first_column); } 
            | IF PARENTESISI expresion PARENTESISD bloqueCodigo ELSE bloqueCodigo   { $$ = new funcionIf.default($3, $5, $7, @1.first_line, @1.first_column); }
            | IF PARENTESISI expresion PARENTESISD bloqueCodigo ELSE funcionIf      { $$ = new funcionIf.default($3, $5, $7, @1.first_line, @1.first_column); }
;

bloqueCodigo : LLAVEI codigos LLAVED { $$ = new Bloque.default($2, @1.first_line, @1.first_column); }
             | LLAVEI LLAVED          { $$ = new Bloque.default([], @1.first_line, @1.first_column); }
;

funcionBreak : BREAK PYC { $$ = new Break.default(@1.first_line, @1.first_column); }
;

funcionContinue : CONTINUE PYC { $$ = new Continue.default(@1.first_line, @1.first_column); }
;

funcionReturn : RETURN expresion PYC { $$ = new Return.default($2, @1.first_line, @1.first_column); }
              | RETURN PYC { $$ = new Return.default(null, @1.first_line, @1.first_column); }
;

funcionWhile : WHILE PARENTESISI expresion PARENTESISD LLAVEI codigos LLAVED { $$ = new FuncionWhile.default($3, $6, @1.first_line, @1.first_column); }
;

funcionFor : FOR PARENTESISI declaracionv PYC expresion PYC forActualizacion LLAVEI codigos LLAVED   { $$ = new FuncionFor.default($3, $5, $7, $9, @1.first_line, @1.first_column); }          
 ;

forActualizacion : ID MASMAS  PARENTESISD   { $$ = new Incremento.default($1, "++", @1.first_line, @1.first_column); }
                 | ID MENOSMENOS  PARENTESISD   { $$ = new Incremento.default($1, "--", @1.first_line, @1.first_column); } 
;

funciondo: DO LLAVEI codigos LLAVED  WHILE PARENTESISI expresion PARENTESISD PYC  { $$ = new FuncionDo.default($3, $7, @1.first_line, @1.first_column); }
;


declaracionArr : tipo ids CORCHETEI CORCHETED IGUAL NEW tipo CORCHETEI expresion CORCHETED PYC  { $$ = new DeclaracionArr.default($1, @1.first_line, @1.first_column, $2, $9,null,$7,null,null); }
               | tipo ids CORCHETEI CORCHETED CORCHETEI CORCHETED IGUAL NEW tipo CORCHETEI expresion CORCHETED CORCHETEI expresion CORCHETED PYC        { $$ = new DeclaracionArr.default($1, @1.first_line, @1.first_column, $2, $11,$14,$9,null,null); }
               | tipo ids CORCHETEI CORCHETED IGUAL CORCHETEI lista_valores CORCHETED PYC     { $$ = new DeclaracionArr.default($1, @1.first_line, @1.first_column, $2, null,null,null,$7,null); }
               | tipo ids CORCHETEI CORCHETED CORCHETEI CORCHETED IGUAL CORCHETEI CORCHETEI lista_valores CORCHETED COMA  CORCHETEI lista_valores CORCHETED CORCHETED PYC { $$ = new DeclaracionArr.default($1, @1.first_line, @1.first_column, $2, null,null,null,$10,$14); }
               | tipo ids CORCHETEI CORCHETED IGUAL funcioncstr PYC { $$ = new DeclaracionCstr.default($1,$2,$6,@1.first_line,@1.first_column); }

;

lista_valores : lista_valores COMA expresion        { $1.push($3); $$ = $1; }
              | expresion                           { $$ = [$1]; }
 
;

accesoVector : ID CORCHETEI expresion CORCHETED { $$ = new AccesoVec.default($1, @1.first_line, @1.first_column, $3); }
             | ID CORCHETEI expresion CORCHETED CORCHETEI expresion CORCHETED { $$ = new AccesoVec.default($1, @1.first_line, @1.first_column, $3, $6); } 
;

modificacionVector : ID CORCHETEI expresion CORCHETED IGUAL expresion   { $$ = new VectorA.default($1, @1.first_line, @1.first_column, $3, $6); } 
                   | ID CORCHETEI expresion CORCHETED CORCHETEI expresion CORCHETED IGUAL expresion  { $$ = new VectorA.default($1, @1.first_line, @1.first_column, $3, $9, $6); }
;
 
funcToLower : TOLOWER PARENTESISI expresion PARENTESISD     { $$ = new toLower.default($3, @1.first_line, @1.first_column); }	
;
funcToUpper : TOUPPER PARENTESISI expresion PARENTESISD     { $$ = new toUpper.default($3, @1.first_line, @1.first_column); }	
;
funcionRound : ROUND PARENTESISI expresion PARENTESISD     { $$ = new Round.default($3, @1.first_line, @1.first_column); }
;
funcionLength: ID PUNTO LENGTH PARENTESISI PARENTESISD { $$ = new Length.default(new AccesoVar.default($1, @1.first_line, @1.first_column), @1.first_line, @1.first_column); }
;
funcionTypeOf: TYPEOF PARENTESISI expresion PARENTESISD { $$ = new TypeOf.default($3, @1.first_line, @1.first_column); }
;
funciontoString: STD DOSPUNTOS DOSPUNTOS TOSTRING PARENTESISI expresion PARENTESISD { $$ = new toStr.default($6, @1.first_line, @1.first_column); }
;
funcioncstr : expresion C_STR PARENTESISI PARENTESISD   { $$ = $1; }
;
funcionSwitch : SWITCH PARENTESISI expresion PARENTESISD LLAVEI lista_casos casodefault LLAVED { $$ = new funcionSwitch.default($3, $6, $7, @1.first_line, @1.first_column);}
              | SWITCH PARENTESISI expresion PARENTESISD LLAVEI lista_casos LLAVED { $$ = new funcionSwitch.default($3, $6, null, @1.first_line, @1.first_column);}
              | SWITCH PARENTESISI expresion PARENTESISD LLAVEI casodefault LLAVED { $$ = new funcionSwitch.default($3, null, $6, @1.first_line, @1.first_column);}
;

lista_casos : lista_casos caso                { $1.push($2); $$ = $1; }
            | caso                            { $$ = [$1]; }
;

caso : CASE expresion DOSPUNTOS codigos     { $$ = new Caso.default($2, $4, @1.first_line, @1.first_column); }
;

casodefault : DEFAULT DOSPUNTOS codigos   { $$ = new Default.default($3, @1.first_line, @1.first_column); }
            
;