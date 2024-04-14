char caracteres[] = ['h','o','l','a',' ','x','d']; 
cout << "Arreglo original: " << endl;
for (int i = 0; i < caracteres.length(); i++) { 
	cout << caracteres[i] + " ";
}
cout << "" << endl;
int n;
n = 7;
// Revertir el arreglo
for (int j = 0; j < caracteres.length() / 2; j++) {
    
    char temp = caracteres[j];
    cout << temp << endl;
    caracteres[j] = caracteres[caracteres.length() - j - 1];
    caracteres[caracteres.length()-j-1] = temp;	 
    temp = ' ';
}

cout << "Arreglo revertido : " << endl;
for (int i = 0; i < caracteres.length(); i++) {
	cout << caracteres[i] + " ";
}
cout << "" << endl;
