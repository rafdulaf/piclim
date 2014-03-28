<!doctype html>
<html>
	<head>
	    <title>Authentification requise</title>
	</head>
	<body>
		<h1>Merci de vous authentifier</h1>
		<form action="index.php">
			<table>
				<tr>
					<td><label for="login">Nom d'utilisateur :</label></td>
					<td><input type="text" id="login" name="login" /></td>
				</tr>
				<tr>
					<td><label for="password">Mot de passe :</label></td>
					<td><input type="password" id="password" name="password" /></td>
				</tr>
			</table>
			<input type="submit" value="Valider" />
		</form>
	</body>
</html>
