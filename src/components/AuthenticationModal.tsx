import React from 'react';
import {
	Button,
	Dialog,
	DialogContent,
	IconButton,
	InputAdornment,
	TextField,
} from '@material-ui/core';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import styled from 'styled-components';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import 'react-tabs/style/react-tabs.css';

interface Props {
	open: boolean;
	onClose: () => void;
}

const AuthenticationModal: React.FC<Props> = ({ open, onClose }) => {
	const [passwordShown, setPasswordShown] = React.useState(false);

	const handleClickShowPassword = () => {
		setPasswordShown(!passwordShown);
	};

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	return (
		<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
			<DialogContent>
				<Tabs>
					<TabList>
						<Tab>Login</Tab>
						<Tab>Sign up</Tab>
					</TabList>
					<TabPanel>
						<StyledDiv>
							<form className="form">
								<TextField
									label="Email"
									type="email"
									className="field"
									inputProps={{ className: 'input-field' }}
									fullWidth
									variant="outlined"
								/>
								<TextField
									label="Password"
									type={passwordShown ? 'text' : 'password'}
									className="field"
									fullWidth
									inputProps={{ className: 'input-field' }}
									variant="outlined"
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}
												>
													{passwordShown ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
								<span className="forgot-password">Forgot Password?</span>
								<Button variant="contained" className="btn">
									LOGIN
								</Button>
								<p>OR</p>
								<Button variant="contained" className="btn btn-google">
									LOGIN WITH GOOGLE
								</Button>
							</form>
						</StyledDiv>
					</TabPanel>
					<TabPanel>
						<StyledDiv>
							<form className="form">
								<TextField
									label="Email"
									type="email"
									className="field"
									inputProps={{ className: 'input-field' }}
									fullWidth
									variant="outlined"
								/>
								<TextField
									label="Name"
									type="text"
									className="field"
									inputProps={{ className: 'input-field' }}
									fullWidth
									variant="outlined"
								/>
								<TextField
									label="Password"
									type={passwordShown ? 'text' : 'password'}
									className="field"
									fullWidth
									inputProps={{ className: 'input-field' }}
									variant="outlined"
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}
												>
													{passwordShown ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
								<span className="forgot-password">Forgot Password?</span>
								<Button variant="contained" className="btn">
									SIGN UP
								</Button>
								<p>OR</p>
								<Button variant="contained" className="btn btn-google">
									CONTINUE WITH GOOGLE
								</Button>
							</form>
						</StyledDiv>
					</TabPanel>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
};

const StyledDiv = styled.div`
	min-height: 22rem;

	.form {
		text-align: center;
		.field {
			margin-top: 1rem;
		}
		.input-field {
			font-size: 1.5rem;
		}
		.btn {
			background: #000;
			color: #fff;
			margin-top: 1rem;
			margin-bottom: 1rem;
			padding: 1rem 0;
			width: 20rem;
		}
		.btn-google {
			background-color: #b83a3a;
		}
		.forgot-password {
			display: block;
			cursor: pointer;
			text-align: right;
			font-size: 1.3rem;
			font-weight: 700;
		}
	}
`;

export default AuthenticationModal;
