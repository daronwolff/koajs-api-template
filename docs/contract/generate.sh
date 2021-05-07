echo "Generating contract..."
rm ./contract.html
raml2html ./main.raml > ./contract.html
open contract.html
echo "Done. Your contract is available in: contract.html file"
