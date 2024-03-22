%{
    
    const Tipo = require('./Analisis/Simbolo/Tipo');
    const Nativo = require('./Analisis/Expresiones/Nativo');
    const Aritmetica = require('./Analisis/Expresiones/Aritmetica');
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
"int"                       return 'INT';
"double"                    return 'DOUBLE';
"bool"                      return 'BOOL';
"char"                      return 'CHAR';
"std"                       return 'STD';
"string"                    return 'STRING';
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
"c_str"                     return 'C_STR';
"execute"                   return 'EXECUTE';
// Simbolos para la gramática
"++"                        return 'MASMAS';
"--"                        return 'MENOSMENOS';
"."                         return 'PUNTO';
'"'                         return 'COMILLAS';
/* COMO CHAR SERIAN ESTOS CARACTERES DENTRO DE COMILLAS SIMPLES
a', 'b', 'c',
'E', '1', '&',
'\', '\n', etc
    USARE ESTA EXPRESION REGULAR PARA DETECTAR CARACTERES */
[']\\\\[']|[']\\\"[']|[']\\\'[']|[']\\n[']|[']\\t[']|[']\\r[']|['].?['] { yytext = yytext.substring(1, yytext.length-1); return 'CARACTER'; }
"'"                         return 'COMILLA';
"\\\\"                      return 'BARRA'; 
"/"                         return 'DIV';
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


<<EOF>>                     return 'EOF';
.					        {console.log(yylloc.first_line, yylloc.first_column,'Lexico',yytext);}

%{
    
%}
// Finaliza parte de Léxica
/lex

// precedencia
%left 'OR'
%left 'AND'
%right 'NOT'
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
//Expresión
//resultado = 2 + 3

// Instrucción
//print(resultado)

inicio : codigos EOF                       {return $1;}
;

codigos : codigos codigo                        { $1.push($2); $$ = $1;}
              | codigo                      { $$ = [$1]; }

;
codigo : declaracionv                        { $$ = $1; }
        
;
declaracionv: tipo ids PYC                   
            | tipo ids IGUAL expresion PYC        { $$ = $4 }  
            | ids IGUAL expresion PYC             { $$ = $3 }
;
ids : ID
    | ids COMA ID       
;
tipo : INT 
     | DOUBLE
     | BOOL
     | CHAR 
     | STD DOSPUNTOS DOSPUNTOS STRING 
;
expresion : NUMERO                               { $$ = new Nativo.default(new Tipo.default(Tipo.TipoDato.ENTERO), $1, @1.first_line, @1.first_column);}
          | DECIMAL                              { $$ = new Nativo.default(new Tipo.default(Tipo.TipoDato.DECIMAL), $1, @1.first_line, @1.first_column);}
          | CADENA                               { $$ = new Nativo.default(new Tipo.default(Tipo.TipoDato.CADENA), $1, @1.first_line, @1.first_column);}
          | TRUE                                 { $$ = new Nativo.default(new Tipo.default(Tipo.TipoDato.BOOLEANO), true, @1.first_line, @1.first_column);}
          | FALSE                                { $$ = new Nativo.default(new Tipo.default(Tipo.TipoDato.BOOLEANO), false, @1.first_line, @1.first_column);}
          | ID 
          | PARENTESISI expresion PARENTESISD    { $$ = $2; }
          | operacion                            { $$ = $1; }
          | CARACTER                             { $$ = new Nativo.default(new Tipo.default(Tipo.TipoDato.CARACTER), $1, @1.first_line, @1.first_column);}
;
operacion : expresion MAS expresion              { $$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.SUMA,@1.first_line, @1.first_column, $1, $3);}     
          | expresion RES expresion              { $$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.RESTA,@1.first_line, @1.first_column, $1, $3);}
          | expresion MUL expresion              { $$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.MULTIPLICACION,@1.first_line, @1.first_column, $1, $3);}
          | expresion DIV expresion              { $$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.DIVISION,@1.first_line, @1.first_column, $1, $3);}
          | expresion MOD expresion              { $$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.MODULO,@1.first_line, @1.first_column, $1, $3);}
          | POW PARENTESISI expresion COMA expresion PARENTESISD { $$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.POTENCIA,@1.first_line, @1.first_column, $3, $5);}
          | RES expresion %prec UMENOS           { $$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.NEGACION,@1.first_line, @1.first_column, $2);}
         

;