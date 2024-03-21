%{
    //Importar clases
    const Tipo = require('./Analisis/Simbolo/Tipo');
    const Nativo = require('./Analisis/Expresiones/Nativo');
    const Aritmetica = require('./Analisis/Expresiones/Aritmetica');
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
    
%}
// Finaliza parte de Léxica
/lex

// precedencia
%right 'RES'
%nonassoc 'POW'
%left 'MAS','RES'
%left 'MUL','DIV'
%right 'UMENOS'
%left 'IGUALIGUAL','DIFERENTE','MENOR','MENORIGUAL','MAYOR','MAYORIGUAL'
%right 'NOT'
%left 'AND'
%left 'OR'


// Inicio de gramática
%start inicio

// Parte sintáctica  - Definición de la gramática
%%

inicio : instrucciones EOF                       {return $1;}
;

instrucciones : instrucciones instruccion        { $1.push($2); $$ = $1;}
              | instruccion                      { $$ = [$1]; }

;
instruccion : declaracion                        { $$ = $1; }
;
declaracion: tipo ids PYC                   
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
          | CADENA
          | ID 
          | PARENTESISI expresion PARENTESISD    { $$ = $2; }
          | operacion
;
operacion : expresion MAS expresion              { $$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.SUMA,@1.first_line, @1.first_column, $1, $3);}     
          | expresion RES expresion              { $$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.RESTA,@1.first_line, @1.first_column, $1, $3);}
          | expresion MUL expresion              { $$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.MULTIPLICACION,@1.first_line, @1.first_column, $1, $3);}
          | expresion DIV expresion              { $$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.DIVISION,@1.first_line, @1.first_column, $1, $3);}
          | expresion POW expresion
          | RES expresion %prec UMENOS           { $$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.NEGACION,@1.first_line, @1.first_column, $2);}

;