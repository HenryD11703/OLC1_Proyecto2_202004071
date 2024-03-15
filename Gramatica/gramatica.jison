%{
    // Importar librerías
%}

%lex // Inicia parte léxica

%options case-insensitive

%%

\s+                                 //ignora espacios

// Comentarios son con //

[0-9]+("."[0-9]+)\b     return 'DECIMAL';
[0-9]+\b                return 'NUMERO';
"EXEC"                  return 'EXEC';
"int"                   return 'INT';
"double"                return 'DOUBLE';
"bool"                  return 'BOOL';
"char"                  return 'CHAR';
"std"                   return 'STD';
"string"                return 'STRING';
"pow"                   return 'POW';
"new"                   return 'NEW';
"true"                  return 'TRUE';
"false"                 return 'FALSE';
"if"                    return 'IF';
"else"                  return 'ELSE';
"switch"                return 'SWITCH';
"case"                  return 'CASE';
"default"               return 'DEFAULT';
"while"                 return 'WHILE';
"break"                 return 'BREAK';
"for"                   return 'FOR';
"do"                    return 'DO';
"continue"              return 'CONTINUE';
"return"                return 'RETURN';
"void"                  return 'VOID';
"cout"                  return 'COUT';
"endl"                  return 'ENDL';
"tolower"               return 'TOLOWER';
"toupper"               return 'TOUPPER';
"length"                return 'LENGTH';
"round"                 return 'ROUND';
"typeof"                return 'TYPEOF';
"toString"              return 'TOSTRING';
"c_str"                 return 'C_STR';
"execute"               return 'EXECUTE';
'"'([^'\\]|\\.)*'"'     return 'CADENA'; //Cadena que tambien valida secuencias de escape
"."                     return 'PUNTO';
([a-zA-z])[a-zA-Z0-9_]* return 'ID';
'"'                     return 'COMILLAS';
"'"                     return 'COMILLA';
"\\\\"                  return 'BARRA'; 
"/"                     return 'DIV';
"*"                     return 'MUL';
":"                     return 'DOSPUNTOS';
"+"                     return 'MAS';
"-"                     return 'RES';
"("                     return 'PARENTESISI';
")"                     return 'PARENTESISD';
","                     return 'COMA';
"%"                     return 'MOD';
"=="                    return 'IGUALIGUAL';
"="                     return 'IGUAL';
"!="                     return 'DIFERENTE';
"!"                     return 'NOT';
"<="                    return 'MENORIGUAL';
"<"                     return 'MENOR';
">="                    return 'MAYORIGUAL';
">"                     return 'MAYOR';
"?"                     return 'INTERROGACION';
"||"                     return 'OR';
"&&"                     return 'AND';
";"                     return 'PYC';
"{"                     return 'LLAVEI';
"}"                     return 'LLAVED';
"["                     return 'CORCHETEI';
"]"                     return 'CORCHETED';

<<EOF>>                 return 'EOF';

.					   {    console.log(yylloc.first_line, yylloc.first_column,'Lexico',yytext);    }

// Finaliza parte de Léxica
/lex

// precedencia
%right 'RES'
%nonassoc 'POW'
%left 'MUL','DIV'
%left 'MAS','RES'
%left 'IGUALIGUAL','DIFERENTE','MENOR','MENORIGUAL','MAYOR','MAYORIGUAL'
%right 'NOT'
%left 'AND'
%left 'OR'

// Inicio de gramática
%start ini

// Parte sintáctica  - Definición de la gramática
%%

ini : instrucciones EOF { return $1;}
;
instrucciones: instrucciones instruccion    {  $1.push($2); $$ = $1;}
            | instruccion                   { $$ =  [$1];}
;
instruccion: expresion PYC        { $$ =  $1;}
;
// Para sitetisar un dato, se utiliza $$
expresion: RES expresion %prec UMINUS  { $$ = 0 - $2;} 
        | expresion MAS expresion      { $$ = $1 + $3;}
        | expresion RES expresion       { $$ = $1 - $3;}
        | expresion MUL expresion       { $$ = $1 * $3;}
        | expresion DIV expresion       { $$ =  $1 / $3;}
        | NUMERO                        { $$ = parseInt($1);}
        | DECIMAL                       { $$ =  parseFloat($1); }
        | ID                            { $$ = $1;}
        | CADENA                       { $$ = $1;}
        
;