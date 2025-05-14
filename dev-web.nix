{ pkgs ? import <nixpkgs> { } }:

pkgs.mkShell {
  name = "dev-web-env";
  buildInputs = with pkgs; [
    nodejs_23
    nodePackages.npm
    nodePackages.tailwindcss
  ];

  shellHook = ''
    echo "Web Development Environment Activated"
    echo "Node $(node -v)"
    echo "NPM $(npm -v)"
    echo "Tailwind CSS $(tailwindcss --version)"
    echo ""
    echo "To install daisyUI in your project, run:"
    echo "npm install daisyui"
  '';
}

