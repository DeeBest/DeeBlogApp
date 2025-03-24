const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.user?.roles)
      return res.status(401).json({ message: 'Unauthorized' });

    const rolesArray = [...allowedRoles];

    const hasValidRole = req.user.roles
      .map((role) => rolesArray.includes(role))
      .find((value) => value === true);

    if (!hasValidRole) return res.status(403).json({ message: 'Forbidden' });
    next();
  };
};

module.exports = verifyRoles;
