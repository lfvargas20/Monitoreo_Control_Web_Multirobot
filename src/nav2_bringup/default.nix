{
  rosPackages = pkgs: with pkgs; {
    nova-nav2-bringup = callPackage ./nix/packages/nav2-bringup { };
  };
}
