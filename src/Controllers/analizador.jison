%{
    // Importar librerías
%}

%lex // Inicia parte léxica

%options case-insensitive

%%

\s+                                 //ignora espacios

// Comentarios son con //

[0-9]+("."[0-9]+)           return 'DECIMAL';
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
[\"]((\\\")|[^\"\n])*[\"]   {yytext=yytext.substring(1,yyleng-1); return 'CADENA';}
"."                         return 'PUNTO';
([a-zA-z])[a-zA-Z0-9_]*     return 'ID';
'"'                         return 'COMILLAS';
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
\/\/([^\n])*                {};//ignora comentarios de una línea
\/\*(.|[\r\n])*?\*\/        {};//ignora comentarios de varias líneas
[\ \f\t\n\r]+               {};
[\n\ ]                      {};

<<EOF>>                     return 'EOF';
.					        {console.log(yylloc.first_line, yylloc.first_column,'Lexico',yytext);}

%{
    // Código de JavaScript
%}
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
%start inicio

// Parte sintáctica  - Definición de la gramática
%%

inicio : instrucciones EOF                  {console.log('Sintactico', 'Correcto');}
;

instrucciones : instrucciones instruccion
              | instruccion
;
instruccion : declaracion
;
declaracion: tipo ids PYC
           | tipo ids IGUAL expresion PYC
;
ids : ID
    | ids COMA ID
;
tipo : INT
     | DOUBLE
     | BOOL
     | CHAR
     | STRING
     | STD DOSPUNTOS DOSPUNTOS STRING
;
expresion : NUMERO
          | DECIMAL
          | CADENA
 
;
