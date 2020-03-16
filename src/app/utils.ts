import * as moment from 'moment';
import 'moment/locale/pt-br';

export function isTokenValid(tokenName: string): boolean 
{
  const tokenData = JSON.parse(
	  localStorage.getItem(tokenName));

  if (tokenData)
  {
    const tokenExpires = new Date(tokenData['expires'])
  
    const dataCompletaAtual = moment();
  
    const dataCompletaExpiracao = converterDataParaMoment(
      tokenExpires);
  
    return dataCompletaAtual.isBefore(dataCompletaExpiracao);
  }
  return false;
}

export function converterDataParaMoment(data: Date)
{
	const dia = data.getUTCDate();
	const mes = data.getUTCMonth(); 
	const ano = data.getUTCFullYear();

	const hora = data.getUTCHours();
	const minuto = data.getUTCMinutes();
	const segundo = data.getUTCSeconds();

	const dataMoment = moment()
	dataMoment.date(dia);
	dataMoment.month(mes);
	dataMoment.year(ano);
	dataMoment.hour(hora);
	dataMoment.minutes(minuto);
	dataMoment.second(segundo);

	return dataMoment
}

export function setLocalStorageTokenData(dados)
{
	localStorage.setItem("access_token_data",
			JSON.stringify(dados["access_token_data"]));
	localStorage.setItem("refresh_token_data",
			JSON.stringify(dados["refresh_token_data"]));
}