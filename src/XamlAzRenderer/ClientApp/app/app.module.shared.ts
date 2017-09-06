import * as ndPackImage from 'ndpack-image';

export class AppModuleShared {

    constructor() {

    }
    public static fontAtlas = ndPackImage(256, 256, 4, "iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAAAklEQVR4AewaftIAAAtaSURBVO3BAW4cWYIlQfcP3f/KPh3YDmwiQVFkldRTPfHMBGJmHukH/1ahUqFSofKqQqVC5VWFyqsKlVuFyq3iovKqQuVWoVKh8q5C5V2FyqsKlYp3KhUq7ypULhU3lVcVKq8qbiq3ipvKRypULhXvVG4VF5VLxTuVS8VN5VZxU7lUqFwqVN5VXFQqPqJScVH5SMVN5VXFTeVdxUXlVvFK5V3FTeVS8UrlVvFOpeKdyq3ipnKpUHlVoVJxU7lU3FQqVF5VqFSofOYHv0HFpeKiUqFSoVKhcqtQuVSofKRC5aJSoXKpULlVqHyFyl9RoXKrULlUvKtQuVWoVKjcKlReVbxT+UiFyiuVVxWXCpVbhUqFyq1C5TMVF5Wbys+oXCouKrcKlVuFyqVC5Vah8hUqtwqVW4XKrULlonKrULmpfETlIxUqtwqVz6hUqNxULhUfqVD5qh98QcWt4lKhUqFSofKfpFJxqVC5VNwqLipfofKuQuUzFSoVr1Q+ovKZCpWKX6lQ+UyFyl+hclO5VFxU3lV8ROWmcqm4qKh8pELlUnFRqVC5VKhcKlR+pULllcpHVCpUvqtC5ZXK71ah8h0/eKNyUbmpVKhUqPyKSoVKhcorlYqLyqVCReVSofJKpUKlQqVCpUJF5VKhcqtQ+R0qVG4qv1Kh8qrionKrUPlIxU3lVnFT+YxKxU3lu1QuFReVm8qvVFxUPlKh8qpCpeI7Kn63ipvKreKm8hUVf1eFynf94G9SqbhUqNxUXlWoXCpULhUq36XySuUzKt9VofJ3Vai8U7lUqFSofETlVYXKReVWoXKrULlVqNwqVFQq3lWoXCpUbiqXiovKZyouKj9TofJdFR9ReVWh8neofETlMxU3lYvKq4rvqPirfvALFbeKS4XKTaVCpULlVqFSoVKh8kqlQuWvUPmIyp+i8lUVKl9V8apC5T9B5VbxVSpfofJXqVRcKlQuFSqvKlT+aVQuFb+LyqVC5TsO/6byEZWLykVF5QkqVP6OCpV3FR9RUVFRuahcKr6rQuW7KlQuKv9JKq9UKi4qKip/l0rFq4qPVKj8FSoVf5pKxXf84N8qVL6r4lahcqtQuahUqFxUKm4qFSr/ZCoVN5VLxa3ionKpeKWiUnFT+RWVipvKRaXipvIZlYqbyq3iovKuQuVPq1B5pVLxSuUrKl6p3FQqbiq3ipvKq4pXKp9Rqbip/ErFpUKl4qbyEZUKlUvFK5VXAvEbVKj8bhUqtwqVP61CZeb/ssNvojIz/10E4h+uQqVCZWZ+D4GYmUf6wb9UXFRuFReViovKrULlVnFRuVW8UnlVcVG5VbxSeVXxSuVS8TMqFSqvKlQqVN5VqFSovKtQqVB5VaFSofKuQqXiIyoVN5UKlXcVN5Vbhcqt4mdUKlRuFTeVS4XKRypuKh+pULlU3FReVdxULhWvVCpUPlKh8qpCpULlXcVFpeKmUnFRuVS8UrlV3FQuFa9UbhWvVCpUKi4qt4pXKhUqrypUbhUqtx/8BhUqlwqVm8qtQuVSoXKpULmp3CpULhUqrypUVG4VKn9ChcrvovKu4qbyKyqXis+ofEalQuWicqtQ+ZkKlVuFys9UqNwqVC4VKq8qVG4Vv6LyTuUzKhU3lUuFyqVC5aJyq1CpULlVqFxUbhUqFSq3iluFyqVCpULldzj8m0rFpULllUrFuwqVm0rFZypUbioVf4XK36VS8apC5StUKm4VKheVilcVKh+pUPmISsVXVKhUfIfKraKi4rtUfqWiomI+pnJTuahUVLyrqKj4ih/8F1GpuKj8p1WoVKi8Uqm4qLxSqVCpUPlIhco/QYXKreJWcVP5lYqPqLyruFRcVH6l4qZyqbio3CouKu8qVP5bqFwqVG4q33F4oVKh8hGViu+oqKhQ+YqKigqVVyoqFRW/i0rFpULld1KpUPlIhcqvqFR8pkLlolLxO6moqFR8pOJSoaKi8jMVF5WLispXqKioVFxU3ql8pELlv5FKxV/1gz9M5btULhU/o3KpUPmTVCpeVajcKlQuFSpfVaHyT6JS8VUqFTeVz6hU3FQ+o1Lxu1Wo/E4qFTeVW8VN5aJS8VUVr1R+RqXiZ37wRuUzKhU3lQqVS4XKZ1QqVC4VKu9UKlQuFSp/ikqFykdULioVtwqVm0qFyq9UqHyHSoXKR1ReqfwVKt+h8h0q36Fyq/i7Kj6jclO5qVxUXqncVD6i8hGVW8VF5SMq36HyMz/4DVQqLipfoVJxUalQeadSoaJS8UrlK1QqXqn8E1S8U5k/S+VSofLfTqXipvIrP/gXlY+oXFReqbxTeafyGZV3Ku9Ubiq/ovIRlV9R+YjKK5WbyjuVdyrvVP4KlQqV/7SKm8pnVCp+h4qbyu+iUqHy307lOwRi/pEqVH6mQuVWoTI/V6Ey/88P5h+t4qLyTuVSMT9XcVOZ/08gZuaRDv9S8ariUvGRikvFq4pLxauKS0VFRUXFu4qKS8WlouIjFRUVt4qZ+bUffFGFyiuVCpUKlc+ovKp4VaHyTuVSoXKrULlUVFxUZubXfvAvKhUqFSpfpVKh8h0VKn+Hyk1lZr7n8AUVKhW/Q4XKzPzvOvybSoXKTaXiVYXKrUKl4isqVGbmf98PvkDlolJxq1C5qFSoqFS8q7hU3FQqLiqfUam4qMzM3yMQf1iFyq9UqNwqVG4VKjPzexxm5rF+8IdU3FRm5p/nB3+Iysz8s/3gH0Sl4qJyq7iozMzvIxAz80iHmXmsw8w81mFmHuswM491mJnHOszMYx1m5rEOM/NYh5l5rMPMPNZhZh7rMDOPdZiZxzrMzGMdZuaxDjPzWIeZeazDzDzWYWYe60fFzDzTYWYe6zAzj3WYmcc6zMxjHWbmsQ4z81iHmXmsw8w81mFmHuswM491mJnHOszMYx1m5rEOM/NYh5l5rMPMPNZhZh7rMDOPdZiZxzrMzGMdZuaxDjPzWIeZeazDzDzWYWYe6zAzj3WYmcc6zMxjHWbmsQ4z81iHmXmsw8w81mFmHuswM491mJnHOszMYx1m5rEOM/NYh5l5rMPMPNZhZh7rMDOPdZiZxzrMzGMdZuaxDjPzWIeZeazDzDzWYWYe6zAzj3WYmcc6zMxjHWbmsQ4z81iHmXmsw8w81mFmHuswM491mJnHOszMYx1m5rEOM/NYh5l5rMPMPNZhZh7rMDOPdZiZxzrMzGMdZuaxDjPzWIeZeazDzDzWYWYe6zAzj3WYmcc6zMxjHWbmsQ4z81iHmXmsw8w81mFmHuswM491mJnHOszMYx1m5rEOM/NYh5l5rMPMPNZhZh7rMDOPdZiZxzrMzGMdZuaxDjPzWIeZeazDzDzWYWYe6zAzj3WYmcc6zMxjHWbmsQ4z81iHmXmsw8w81mFmHuswM491mJnHOszMYx1m5rEOM/NYh5l5rMPMPNZhZh7rMDOPdZiZxzrMzGMdZuaxDjPzWIeZeazDzDzWYWYe6zAzj3WYmcc6zMxjHWbmsQ4z81iHmXmsw8w81mFmHuswM491mJnHOszMYx1m5rEOM/NYh5l5rMPMPNZhZh7rMDOPdZiZxzrMzGMdZuaxDjPzWIeZeazDzDzWYWYe6zAzj3WYmcc6zMxjHWbmsQ4z81iHmXmsw8w81mFmHuswM491mJnHOszMYx1m5rEOM/NYh5l5rMPMPNZhZh7rMDOPdZiZxzrMzGMdZuaxDjPzWIeZeazDzDzWYWYe6zAzj3WYmcc6zMxjHWbmsQ4z81iHmXmsw8w81mFmHuswM491mJnHOszMYx1m5rEOM/NYh5l5rMPMPNZhZh7rMDOPdZiZxzrMzGMdZuaxDjPzWIeZeazDzDzWYWYe6zAzj3WYmcc6zMxjHWbmsQ4z81iHmXms/wFPVfm15inbwgAAAABJRU5ErkJggg==");
    public static vert: string = `
        precision mediump float;
 
        attribute vec2 aPosition;
        attribute vec4 aColor;
        attribute vec2 aUv;

        uniform mat4 uProj;

        varying vec4 vColor;
        varying vec2 vUv;
 
        void main() {
          gl_Position = uProj * vec4(aPosition, 0, 1);
          vColor = aColor;
          vUv = aUv;
        }
        `;

    public static frag: string = `
        precision mediump float;
 
        varying vec4 vColor;
        varying vec2 vUv;

        uniform sampler2D uFontAtlas;

        void main() {
          vec4 sample = texture2D(uFontAtlas, vUv);
          gl_FragColor = vec4(vColor.xyz * sample.xyz, sample.x * vColor.a );
        }
        `;

}