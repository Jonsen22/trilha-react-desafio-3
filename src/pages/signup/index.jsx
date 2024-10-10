import { useNavigate  } from "react-router-dom";
import { Header } from "../../components/Header"
import { Input } from '../../components/Input';
import { MdEmail, MdLock, MdPassword } from 'react-icons/md'
import { Button } from '../../components/Button';
import { api } from '../../services/api';
import { AvisoText,AvisoText2, Column, Container, CriarText, Row, SubtitleRegister, Title, TitleRegister, Wrapper } from "./styles"

import { useForm } from "react-hook-form";

const SignUp = () => {

    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors  } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try{
            const {data} = await api.get(`/users?email=${formData.email}&senha=${formData.senha}`);
            
            if(data.length && data[0].id){
                navigate('/feed') 
                return
            }

            alert('Usuário ou senha inválido')
        }catch(e){
            //TODO: HOUVE UM ERRO
        }
    };

    return (
      <>
        <Header />
        <Container>
          <Column>
            <Title>
              A plataforma para você aprender com experts, dominar as principais
              tecnologias e entrar mais rápido nas empresas mais desejadas.
            </Title>
          </Column>
          <Column>
            <Wrapper>
              <TitleRegister>Comece agora grátis</TitleRegister>
              <SubtitleRegister>
                Crie sua conta e make the change._
              </SubtitleRegister>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  placeholder="Nome Completo"
                  leftIcon={<MdEmail />}
                  name="nome"
                  control={control}
                />
                <Input
                  placeholder="E-mail"
                  leftIcon={<MdEmail />}
                  name="email"
                  control={control}
                />
                {errors.email && <span>E-mail é obrigatório</span>}
                {errors.senha && <span>Senha é obrigatório</span>}
                <Input
                  type="password"
                  placeholder="Senha"
                  leftIcon={<MdLock />}
                  name="senha"
                  control={control}
                />
                {errors.senha && <span>Senha é obrigatório</span>}
                <Button title="Entrar" variant="secondary" type="submit" />
              </form>
                <AvisoText>Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.</AvisoText>
              <Row>
                <AvisoText2>Já tenho conta. </AvisoText2>
                <CriarText> Fazer Login</CriarText>
              </Row>
            </Wrapper>
          </Column>
        </Container>
      </>
    );
}

export {SignUp}