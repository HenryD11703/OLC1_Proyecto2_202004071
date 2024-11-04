# Custom C++-like Programming Language Implementation

## Overview
This project implements a programming language with syntax similar to C++, featuring support for basic programming constructs, data types, control structures, and array operations. The language is designed to be intuitive for users familiar with C++ while maintaining its own unique characteristics.

## Language Features

### Basic Syntax

#### Comments
The language supports both single-line and multi-line comments:
```cpp
// Single line comment
/* Multi-line
   comment */
```

#### Data Types
Supported primitive data types:
- `INT` - Integer values
- `DOUBLE` - Floating-point numbers
- `BOOL` - Boolean values
- `CHAR` - Single characters
- `STD::STRING` - String values
- `VOID` - Used for functions with no return value

### Variable Declaration

Variables can be declared in several ways:
```cpp
// Single variable declaration
<type> identifier;

// Multiple variable declaration
<type> id1, id2, id3;

// Declaration with initialization
<type> identifier = <expression>;

// Multiple declaration with initialization
<type> id1, id2, id3 = <expression>;
```

### Arrays

The language supports both single and multi-dimensional arrays with two declaration styles:

1. Size-specified declaration:
```cpp
// Single dimension
<type> array[] = new <type>[size];

// Two dimensions
<type> array[][] = new <type>[size1][size2];
```

2. Value-list declaration:
```cpp
// Single dimension
<type> array[] = [value1, value2, ...];

// Two dimensions
<type> array[][] = [[value1, value2], [value3, value4]];
```

### Control Structures

#### Conditional Statements
```cpp
// If statement
IF (condition) {
    // code
}

// If-else statement
IF (condition) {
    // code
} ELSE {
    // code
}

// Nested if-else
IF (condition1) {
    // code
} ELSE IF (condition2) {
    // code
}
```

#### Loops
```cpp
// While loop
WHILE (condition) {
    // code
}

// Do-while loop
DO {
    // code
} WHILE (condition);

// For loop
FOR (initialization; condition; increment/decrement) {
    // code
}
```

#### Switch Statement
```cpp
SWITCH (expression) {
    CASE value1:
        // code
    CASE value2:
        // code
    DEFAULT:
        // code
}
```

### Functions

Functions can be declared with or without parameters:
```cpp
<return_type> functionName(parameters) {
    // code
    RETURN expression;
}

<return_type> functionName() {
    // code
}
```

### Special Operations

#### Type Casting
The language supports explicit type casting using:
- `PINTP` - Cast to integer
- `PDOUBLEP` - Cast to double
- `PCHARP` - Cast to char
- `PSTRINGP` - Cast to string

#### Built-in Functions
- `TOLOWER(expression)` - Convert string to lowercase
- `TOUPPER(expression)` - Convert string to uppercase
- `ROUND(expression)` - Round a number
- `LENGTH()` - Get array/string length
- `TYPEOF(expression)` - Get type of expression
- `STD::TOSTRING(expression)` - Convert to string
- `C_STR()` - String conversion function

### Input/Output
Output operations are handled using a C++-like syntax:
```cpp
COUT << expression;
COUT << expression << ENDL;
```

## Development Environment

The implementation includes:
- Multi-tab editor interface
- File loading capabilities
- Symbol table reporting
- Syntax highlighting
- Error reporting

## Symbol Table

The symbol table maintains information about all declared variables, including:
- Identifier (ID)
- Type
- Value

## Notes
- All statements must end with a semicolon (;)
- The language is case-sensitive
- Block scoping is supported using curly braces {}
- Array indices start at 0
- Error handling is implemented for syntax and semantic errors

## File Structure
The grammar is defined using a context-free grammar notation, with clear production rules for each language construct. This ensures consistent parsing and interpretation of the code.
