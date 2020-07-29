import * as moment from 'moment';
import 'moment/locale/pt-br';
import { environment } from './../environments/environment'

export function isTokenValid(tokenName: string): boolean 
{
  const tokenData = JSON.parse(localStorage.getItem(tokenName));

  if (tokenData)
  {
    const tokenExpires = tokenData['expires']
  
    const dataCompletaAtual = moment();
  
    const dataCompletaExpiracao = converterDataParaMoment(tokenExpires);

		return dataCompletaAtual.isBefore(dataCompletaExpiracao);
  }
  return false;
}

export function converterDataParaMoment(data: string)
{
	const dateTimeArray = data.split(' ')
	const dateArray = dateTimeArray[0].split('/');
	const timeArray = dateTimeArray[1].split(':');

	const dia = Number(dateArray[0]);
	const mes = Number(dateArray[1]) - 1; 
	const ano = Number(dateArray[2]);

	const hora = Number(timeArray[0]);
	const minuto = Number(timeArray[1]);
	const segundo = Number(timeArray[2]);

	const dataMoment = moment()
	
	dataMoment.date(dia);
	dataMoment.month(mes);
	dataMoment.year(ano);
	dataMoment.hour(hora);
	dataMoment.minutes(minuto);
	dataMoment.second(segundo);
	
	return dataMoment;
}

export function setLocalStorageTokenData(dados)
{
	const expiresAccessToken = dados['access_token_data']['expires'];
	const expiresRefreshToken = dados['refresh_token_data']['expires'];

	if (environment.production)
	{
		dados['access_token_data']['expires'] = new Date(expiresAccessToken)
				.toLocaleString('pt-BR');
		dados['refresh_token_data']['expires'] = new Date(expiresRefreshToken)
				.toLocaleString('pt-BR');
	}
	else
	{
		dados['access_token_data']['expires'] = new Date(expiresAccessToken
				.replace(' GMT', '')).toLocaleString('pt-BR');
		dados['refresh_token_data']['expires'] = new Date(expiresRefreshToken
				.replace(' GMT', '')).toLocaleString('pt-BR');
	}
	localStorage.setItem("access_token_data",
			JSON.stringify(dados["access_token_data"]));
	localStorage.setItem("refresh_token_data",
			JSON.stringify(dados["refresh_token_data"]));
}

export function clearLocalStorageTokenData()
{
	localStorage.removeItem("access_token_data");
	localStorage.removeItem("refresh_token_data");
}

export function getTokenJTI(tokenName: string)
{
	return JSON.parse(localStorage.getItem(tokenName))['jti'];
}

export function getFromLocalStorageDadosUrlAnterior()
{
	return JSON.parse(localStorage.getItem('urlAnterior'));
}

export function setInLocalStorageDadosUrlAnterior(urlAnterior: string, renovouTokenDuranteRedirecionamento: boolean)
{
	localStorage.setItem('urlAnterior', JSON.stringify({
		'url': urlAnterior,
		'renovouTokenDuranteRedirecionamento': renovouTokenDuranteRedirecionamento
	}));
}