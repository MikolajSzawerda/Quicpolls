import {Auth} from "@supabase/auth-ui-react";
import {supaClient} from "../../lib/supa-client";
import {useLocation, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../main";
export const LoginPage = () => {
    const location = useLocation()
    const session = useContext(UserContext)
    const navigate = useNavigate()
    if(session.currentSession?.user){
        navigate("/polls")
    }
    return <div className="login-panel">
        <Auth supabaseClient={supaClient}
              providers={[]}
              appearance={{
                  extend: false,
                  className: {
                      button: "form-submit-button",
                      container: "form-container",
                      input: "form-input",
                      label: "form-label",
                      anchor: "form-anchor",
                      divider: "form-divider",
                      message: 'form-message'
                  }
              }}
              view={location.state?.mode}>
        </Auth>
    </div>
}